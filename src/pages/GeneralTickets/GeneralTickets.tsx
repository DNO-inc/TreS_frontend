import { useEffect, useState, FC, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { SerializedError } from "@reduxjs/toolkit";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import { Ticket } from "../../components/Ticket/Ticket";
import { Loader } from "../../components/Loader";
import { FilterPanel } from "../../components/FilterPanel";
import { CustomPagination } from "../../components/CustomPagination";
import { NotFound } from "../../components/NotFound";

import { useGetTicketsMutation } from "../../store/api/tickets.api";
import { ITicket } from "../../components/Ticket/ticket.interface";
import { useAuth } from "../../context/AuthContext/AuthContext";
import { useWindowWidth } from "../../shared/hooks";
import { checkIsAdmin } from "../../shared/functions";
import {
  useGetFacultiesQuery,
  useGetStatusesQuery,
} from "../../store/api/meta.api";

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

  const [tickets, setTickets] = useState<ITicket[]>([]);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [facultyId, setFacultyId] = useState<number | null>(null);
  const [ticketsPerRow, setTicketsPerRow] = useState(Math.round(width / 600));

  const [getTickets, { isLoading, isSuccess: isTicketsSuccess }] =
    useGetTicketsMutation();
  const faculties = useGetFacultiesQuery({});
  const statuses = useGetStatusesQuery({});

  const [searchParams] = useSearchParams();
  const currentPage: number = Number(searchParams.get("current_page")) || 1;
  const facultyQuery: string | null = searchParams.get("faculty");

  const { isAuth } = useAuth();
  const isAdmin = checkIsAdmin();

  const option: string = !isAuth
    ? "anon"
    : isAdmin
    ? "admin/tickets"
    : "tickets";

  const requestBody = useMemo(() => {
    const matchingStatusesId: number[] = [];

    if (statuses.isSuccess) {
      const statusList = statuses.data?.statuses_list;
      const statusesQuery = searchParams
        .get("statuses")
        ?.split(",")
        .map((status: string) => status.toUpperCase());

      for (const status of statusList) {
        if (statusesQuery && statusesQuery.includes(status.name)) {
          matchingStatusesId.push(status.status_id);
        }
      }
    }

    if (faculties.isSuccess) {
      if (facultyQuery === "all") {
        setFacultyId(null);
      } else {
        setFacultyId(
          faculties.data.faculties_list.find(
            (faculty: IFaculty) => faculty.name === facultyQuery
          )?.faculty_id
        );
      }
    }

    return {
      start_page: currentPage,
      items_count: ticketsPerRow * 4,
      faculty: facultyId,
      status: matchingStatusesId,
    };
  }, [option, facultyId, searchParams, ticketsPerRow]);

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

  return (
    <Grid container flexDirection={"column"}>
      <Box>
        <Typography variant="h1">{t("generalTickets.heading")}</Typography>
        <FilterPanel isAllStatuses={isAdmin} />
      </Box>
      <Box>
        {isLoading && <Loader />}
        {isTicketsSuccess &&
          (tickets.length ? (
            <>
              <Grid container gap={2}>
                {tickets.map(ticket => {
                  return (
                    <Ticket
                      ticketsPerRow={ticketsPerRow}
                      ticket={ticket}
                      key={ticket.ticket_id}
                    />
                  );
                })}
              </Grid>
              <CustomPagination total={totalPage} current={currentPage} />
            </>
          ) : (
            <NotFound withPostscript={true} />
          ))}
      </Box>
    </Grid>
  );
};

export { GeneralTickets };
