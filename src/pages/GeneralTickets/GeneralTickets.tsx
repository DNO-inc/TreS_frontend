import { useEffect, useState, FC } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { SerializedError } from "@reduxjs/toolkit";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import { FilterPanel } from "../../components/FilterPanel";

import { useGetTicketsMutation } from "../../store/api/tickets.api";
import { ITicket } from "../../components/Ticket/ticket.interface";
import { useAuth } from "../../context/AuthContext/AuthContext";
import { useWindowWidth } from "../../shared/hooks";
import { checkIsAdmin } from "../../shared/functions";
import { useGetRequestBody } from "./hooks/useGetRequestBody";
import { useRenderElements } from "./hooks/useRenderElements";

interface GeneralTicketsPageInfo {
  data?: {
    ticket_list: ITicket[];
    total_pages: number;
  };
  error?: FetchBaseQueryError | SerializedError;
}

const GeneralTickets: FC = () => {
  const { t } = useTranslation();

  const width = useWindowWidth();
  const { isAuth } = useAuth();
  const isAdmin = checkIsAdmin();

  const [tickets, setTickets] = useState<ITicket[]>([]);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [ticketsPerRow, setTicketsPerRow] = useState(Math.round(width / 600));

  const [getTickets, { isLoading, isSuccess: isTicketsSuccess }] =
    useGetTicketsMutation();

  const [searchParams] = useSearchParams();
  const currentPage: number = Number(searchParams.get("current_page")) || 1;
  const option: string = isAuth
    ? isAdmin
      ? "admin/tickets"
      : "tickets"
    : "anon";
  const requestBody = useGetRequestBody({ currentPage, ticketsPerRow, option });

  useEffect(() => {
    getTickets({
      option: option,
      body: JSON.stringify(requestBody),
    }).then((res: GeneralTicketsPageInfo): void | PromiseLike<void> => {
      if (res.data) {
        setTickets(res.data.ticket_list);
        setTotalPage(res.data.total_pages);

        window.scrollTo({ top: 0 });
      }
    });
  }, [requestBody, ticketsPerRow]);

  useEffect(() => {
    setTicketsPerRow(Math.round(width / 600));
  }, [width]);

  const { renderSkeletonTickets, renderTickets, renderNotFound } =
    useRenderElements(
      ticketsPerRow,
      tickets,
      totalPage,
      currentPage,
      isLoading
    );

  return (
    <Grid container flexDirection={"column"}>
      <Box>
        <Typography variant="h1">{t("generalTickets.heading")}</Typography>
        <FilterPanel isAllStatuses={isAdmin} />
      </Box>
      <Box>
        {isLoading && renderSkeletonTickets()}
        {isTicketsSuccess &&
          (tickets.length ? renderTickets() : renderNotFound())}
      </Box>
    </Grid>
  );
};

export { GeneralTickets };
