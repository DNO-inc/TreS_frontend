import { useEffect, useState, FC, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
  MutationDefinition,
} from "@reduxjs/toolkit/query/react";
import { SerializedError } from "@reduxjs/toolkit";
import { MutationTrigger } from "@reduxjs/toolkit/dist/query/react/buildHooks";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import FormGroup from "@mui/material/FormGroup";

import { Loader } from "../../components/Loader";
import { FilterPanel } from "../../components/FilterPanel";
import { CustomPagination } from "../../components/CustomPagination";
import { TicketRow } from "../../components/TicketRow/TicketRow";

import { useJwtDecode } from "../../shared/hooks";
import { useGetFacultiesQuery, useGetStatusesQuery } from "../../store/api/api";
import { useDeleteTicketMutation } from "../../store/api/tickets/tickets.api";
import { ITicket } from "../../components/Ticket/ticket.interface";

interface MyTicketPageProps {
  title: string;
  useGetQuery: MutationTrigger<
    MutationDefinition<
      any,
      BaseQueryFn<
        string | FetchArgs,
        unknown,
        FetchBaseQueryError,
        {},
        FetchBaseQueryMeta
      >,
      never,
      any,
      "api"
    >
  >;
  isLoading: boolean;
  isSuccess: boolean;
  option?: string;
  userId?: boolean | number;
}

interface MyTicketPageInfo {
  data?: {
    ticket_list: ITicket[];
    total_pages: number;
  };
  error?: FetchBaseQueryError | SerializedError;
}

const MyTicketPage: FC<MyTicketPageProps> = ({
  title,
  useGetQuery,
  isLoading,
  isSuccess,
  option,
  userId,
}) => {
  const { t, i18n } = useTranslation();

  const [tickets, setTickets] = useState<ITicket[]>([]);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [facultyId, setFacultyId] = useState<number | null>(null);

  const jwt = useJwtDecode();
  const faculties = useGetFacultiesQuery({});
  const statuses = useGetStatusesQuery({});
  const [deleteTicket, { isSuccess: isDeleteSuccess }] =
    useDeleteTicketMutation();

  const [searchParams] = useSearchParams();
  const currentPage: number = Number(searchParams.get("current_page")) || 1;
  const facultyQuery: string | null = searchParams.get("faculty");
  const isSentPage = title === "sent";

  const requestBody = useMemo(() => {
    const matchingStatusesId = [];

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

    const data: {
      creator?: number | boolean | undefined;
      start_page: number;
      faculty: number | null;
      status: number[];
      bookmarks_type?: string;
    } = {
      start_page: currentPage,
      faculty: facultyId,
      status: matchingStatusesId,
    };

    if (option) {
      data.creator = userId;
    }

    if (title === "followed") {
      data.bookmarks_type = "strangers";
    } else if (title === "bookmarks") {
      data.bookmarks_type = "my";
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
  }, [searchParams, requestBody, isDeleteSuccess]);

  const handleDelete = (ticketIdList: number[]): void => {
    deleteTicket({ body: JSON.stringify({ ticket_id_list: ticketIdList }) });
  };

  return (
    <Grid container flexDirection={"column"}>
      <Box>
        <Typography variant="h1" sx={{ mb: 2 }}>
          {t(`${title}.heading`)}
        </Typography>
        <FilterPanel isAllStatuses={isSentPage || option === "deleted"} />
      </Box>
      <Box sx={{ pt: 20 }}>
        {isLoading && <Loader />}
        {isSuccess &&
          (tickets && tickets.length ? (
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
                      isAuth={!!jwt}
                      lang={i18n.language}
                      isCanDelete={isSentPage}
                      isHaveBookmarks={isSentPage}
                      handleDelete={isSentPage ? handleDelete : null}
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
            <Typography variant="h1" mt={6}>
              Not found
            </Typography>
          ))}
      </Box>
    </Grid>
  );
};

export { MyTicketPage };
