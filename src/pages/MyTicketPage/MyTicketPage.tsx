import { useEffect, useState, FC, useMemo } from "react";
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
import { Button } from "@mui/material";

import { NotFound } from "../../components/NotFound";
import { FilterPanel } from "../../components/FilterPanel";
import { CustomPagination } from "../../components/CustomPagination";
import { TicketRow } from "../../components/TicketRow/TicketRow";

import {
  useDeleteTicketMutation,
  useUndeleteTicketMutation,
} from "../../store/api/tickets.api";
import { ITicket } from "../../components/Ticket/ticket.interface";
import {
  useGetFacultiesQuery,
  useGetStatusesQuery,
} from "../../store/api/meta.api";

interface MyTicketPageProps {
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
  isLoading: boolean;
  isSuccess: boolean;
  option?: string;
  userId?: boolean | number;
  assignee?: number;
}

interface MyTicketPageInfo {
  data?: {
    ticket_list: ITicket[];
    total_pages: number;
  };
  error?: FetchBaseQueryError | SerializedError;
}

interface IStatus {
  status_id: number;
  name: string;
}

const MyTicketPage: FC<MyTicketPageProps> = ({
  title,
  useGetQuery,
  // isLoading,
  // isSuccess,
  option,
  userId,
  assignee,
}) => {
  const { t, i18n } = useTranslation();

  const [tickets, setTickets] = useState<ITicket[]>([]);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [facultyId, setFacultyId] = useState<number | null>(null);
  const [deletedList, setDeletedList] = useState<number[]>([]);

  const faculties = useGetFacultiesQuery({});
  const statuses = useGetStatusesQuery({});
  const [deleteTicket, { isSuccess: isDeleteSuccess }] =
    useDeleteTicketMutation();
  const [undeleteTicket, { isSuccess: isUndeleteSuccess }] =
    useUndeleteTicketMutation();

  const [searchParams] = useSearchParams();
  const currentPage: number = Number(searchParams.get("current_page")) || 1;
  const facultyQuery: string | null = searchParams.get("faculty");

  const isSentPage = title === "sent";
  const isDeletedPage = title === "deleted";
  const isReceivedPage = title === "received";

  const requestBody = useMemo(() => {
    let matchingStatusesId: number[] = [];

    if (statuses.isSuccess) {
      const statusList: IStatus[] = statuses.data?.statuses_list;

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

    const data: {
      creator?: number | boolean | undefined;
      assignee?: number;
      start_page: number;
      faculty: number | null;
      status: number[];
      bookmarks_type?: string;
    } = {
      start_page: currentPage,
      faculty: facultyId,
      status: matchingStatusesId,
    };

    if (option === "tickets") {
      data.creator = userId;
    }

    if (assignee) {
      data.assignee = assignee;
    }

    return data;
  }, [facultyId, searchParams]);

  useEffect(() => {
    const requestProps: { body: string; option?: string } = {
      body: JSON.stringify(requestBody),
    };

    if (option) {
      requestProps.option = option;
    }

    useGetQuery(requestProps).then(
      (res: MyTicketPageInfo): void | PromiseLike<void> => {
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
                gap: 1,
                flexDirection: "row",
              }}
            >
              {tickets.map(ticket => {
                return (
                  <TicketRow
                    ticket={ticket}
                    lang={i18n.language}
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

export { MyTicketPage };
