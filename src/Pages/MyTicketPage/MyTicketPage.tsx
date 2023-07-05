import { useEffect, useState, FC, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useSearchParams } from "react-router-dom";
import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
  MutationDefinition,
} from "@reduxjs/toolkit/query/react";
import { SerializedError } from "@reduxjs/toolkit";
import { MutationTrigger } from "@reduxjs/toolkit/dist/query/react/buildHooks";

import { Box, Grid, Typography, FormGroup } from "@mui/material";

import { Loader } from "../../components/Loader";
import { FilterPanel } from "../../components/FilterPanel";
import { CustomPagination } from "../../components/CustomPagination";
import { TicketRow } from "../../components/TicketRow/TicketRow";

import { useJwtDecode } from "../../shared/hooks";
import { useGetFacultiesQuery, useGetStatusesQuery } from "../../store/api/api";
import { useDeleteTicketMutation } from "../../store/api/tickets/tickets.api";

interface MyTicketPageProps {
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
  useGetQuery,
  isLoading,
  isSuccess,
  option,
  userId,
}) => {
  const { t } = useTranslation();
  const { pathname } = useLocation();

  const [tickets, setTickets] = useState<ITicket[]>([]);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [facultyId, setFacultyId] = useState<number | null>(null);

  const jwt = useJwtDecode();
  const faculties = useGetFacultiesQuery({});
  const statuses = useGetStatusesQuery({});
  const [deleteTicket, { isSuccess: isDeleteSuccess }] =
    useDeleteTicketMutation();

  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage: number = Number(searchParams.get("current_page")) || 1;
  const facultyQuery: string | null = searchParams.get("faculty");
  const isSentPage = pathname === "/sent";

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
    } = {
      start_page: currentPage,
      faculty: facultyId,
      status: matchingStatusesId,
    };

    if (option) {
      data.creator = userId;
    }

    return data;
  }, [currentPage, facultyId, searchParams, statuses.isSuccess]);

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

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());

    if (params.has("current_page")) {
      params.set("current_page", page.toString());
    } else {
      params.append("current_page", page.toString());
    }

    setSearchParams(params);
  };

  const handleDelete = (ticketId: number): void => {
    deleteTicket({ body: JSON.stringify({ ticket_id: ticketId }) });
  };

  return (
    <Grid container flexDirection={"column"}>
      <Box>
        <Typography variant="h1">{t("bookmarks.heading")}</Typography>
        <FilterPanel isAllStatuses={isSentPage || pathname === "/deleted"} />
      </Box>
      <Box>
        {isLoading && <Loader />}
        {isSuccess &&
          (tickets.length ? (
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
                      isCanDelete={isSentPage}
                      handleDelete={isSentPage ? handleDelete : null}
                      key={ticket.ticket_id}
                    />
                  );
                })}
              </FormGroup>
              {totalPage > 1 && (
                <CustomPagination
                  total={totalPage}
                  current={currentPage}
                  onChange={handlePageChange}
                />
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
