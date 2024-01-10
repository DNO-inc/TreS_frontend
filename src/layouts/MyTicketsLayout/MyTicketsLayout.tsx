import { useEffect, useState, FC } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  MutationDefinition,
} from "@reduxjs/toolkit/query/react";
import { SerializedError } from "@reduxjs/toolkit";
import { MutationTrigger } from "@reduxjs/toolkit/dist/query/react/buildHooks";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import FormGroup from "@mui/material/FormGroup";
import Button from "@mui/material/Button";

import { FilterPanel } from "../../components/FilterPanel";
import { TicketRow } from "../../components/TicketRow/TicketRow";
import { CustomPagination } from "../../components/CustomPagination";
import { NotFound } from "../../components/NotFound";

import { useGetRequestBody } from "./hooks/useGetRequestBody";
import { ITicket } from "../../components/Ticket/ticket.interface";
import {
  useDeleteTicketMutation,
  useUndeleteTicketMutation,
} from "../../store/api/tickets.api";

interface MyTicketsLayoutProps {
  title: string;
  useGetQuery: MutationTrigger<
    MutationDefinition<
      any,
      BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>,
      never,
      any,
      "api"
    >
  >;
  option?: "bookmarked" | "followed" | "tickets";
  userId?: boolean | number;
  assignee?: number;
}

interface MyTicketsLayoutInfo {
  data?: {
    ticket_list: ITicket[];
    total_pages: number;
  };
  error?: FetchBaseQueryError | SerializedError;
}

const MyTicketsLayout: FC<MyTicketsLayoutProps> = ({
  title,
  useGetQuery,
  option,
  userId,
  assignee,
}) => {
  const { t } = useTranslation();

  const [tickets, setTickets] = useState<ITicket[]>([]);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [deletedList, setDeletedList] = useState<number[]>([]);

  const [deleteTicket, { isSuccess: isDeleteSuccess }] =
    useDeleteTicketMutation();
  const [undeleteTicket, { isSuccess: isUndeleteSuccess }] =
    useUndeleteTicketMutation();

  const [searchParams] = useSearchParams();
  const currentPage: number = Number(searchParams.get("current_page")) || 1;

  const isSentPage = title === "sent";
  const isDeletedPage = title === "deleted";
  const isReceivedPage = title === "received";

  const requestBody = useGetRequestBody({
    currentPage,
    option,
    userId,
    assignee,
  });

  useEffect(() => {
    const requestProps: { body: string; option?: string } = {
      body: JSON.stringify(requestBody),
    };

    if (option) {
      requestProps.option = option;
    }

    useGetQuery(requestProps).then(
      (res: MyTicketsLayoutInfo): void | PromiseLike<void> => {
        if (res.data) {
          setTickets(res.data.ticket_list);
          setTotalPage(res.data.total_pages);
        }
      }
    );
  }, [searchParams, requestBody, isDeleteSuccess, isUndeleteSuccess]);

  const handleDelete = (ticketIdList: number[]): void => {
    deleteTicket({ body: JSON.stringify({ ticket_id_list: ticketIdList }) });
  };

  const handleRestore = (ticketId: number): void => {
    undeleteTicket({ body: JSON.stringify({ ticket_id: ticketId }) });
  };

  return (
    <Grid container flexDirection={"column"}>
      <Box>
        <Typography variant="h1">{t(`${title}.heading`)}</Typography>
        <FilterPanel
          isAllStatuses={isSentPage || isDeletedPage || isReceivedPage}
        />
      </Box>
      {isSentPage && deletedList.length > 0 && (
        <Button
          onClick={() => handleDelete(deletedList)}
          variant="outlined"
          sx={{ mt: 17, mb: -15 }}
        >
          Delete All selected tickets
        </Button>
      )}
      <Box sx={{ pt: isSentPage && deletedList.length ? 1 : 20 }}>
        {tickets && tickets.length ? (
          <>
            <FormGroup
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: 1,
              }}
            >
              {tickets.map(ticket => {
                return (
                  <TicketRow
                    ticket={ticket}
                    additionalAction={title}
                    isHaveBookmarks={isSentPage}
                    handleDelete={isSentPage ? handleDelete : null}
                    handleRestore={isDeletedPage ? handleRestore : null}
                    setDeletedList={isSentPage ? setDeletedList : null}
                    key={ticket.ticket_id}
                  />
                );
              })}
            </FormGroup>
            {totalPage > 1 && (
              <CustomPagination total={totalPage} current={currentPage} />
            )}
          </>
        ) : (
          <NotFound withPostscript={isSentPage} />
        )}
      </Box>
    </Grid>
  );
};

export { MyTicketsLayout };
