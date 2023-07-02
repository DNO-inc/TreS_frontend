import { useEffect, useState, FC, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { SerializedError } from "@reduxjs/toolkit";

import { Box, Grid, Typography, FormGroup } from "@mui/material";

import { Loader } from "../../components/Loader";
import { FilterPanel } from "../../components/FilterPanel";
import { CustomPagination } from "../../components/CustomPagination";
import { TicketRow } from "../../components/TicketRow/TicketRow";

import { useGetSavedTicketsMutation } from "../../store/api/tickets/tickets.api";
import { useJwtDecode } from "../../shared/hooks";
import { useGetFacultiesQuery, useGetStatusesQuery } from "../../store/api/api";

interface BookmarksPageInfo {
  data?: {
    ticket_list: ITicket[];
    total_pages: number;
  };
  error?: FetchBaseQueryError | SerializedError;
}

const Bookmarks: FC = () => {
  const { t } = useTranslation();

  const [tickets, setTickets] = useState<ITicket[]>([]);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [facultyId, setFacultyId] = useState<number | null>(null);

  const jwt = useJwtDecode();
  const [getTickets, { isLoading, isSuccess: isTicketsSuccess }] =
    useGetSavedTicketsMutation();
  const faculties = useGetFacultiesQuery({});
  const statuses = useGetStatusesQuery({});

  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage: number = Number(searchParams.get("current_page")) || 1;
  const facultyQuery: string | null = searchParams.get("faculty");

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

    return {
      start_page: currentPage,
      faculty: facultyId,
      status: matchingStatusesId,
    };
  }, [currentPage, facultyId, searchParams, statuses.isSuccess]);

  useEffect(() => {
    getTickets({
      option: "bookmarked",
      body: JSON.stringify(requestBody),
    }).then((res: BookmarksPageInfo): void | PromiseLike<void> => {
      if (res.data) {
        setTickets(res.data.ticket_list);
        setTotalPage(res.data.total_pages);
      }
    });
  }, [searchParams, getTickets, requestBody]);

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());

    if (params.has("current_page")) {
      params.set("current_page", page.toString());
    } else {
      params.append("current_page", page.toString());
    }

    setSearchParams(params);
  };

  return (
    <Grid container flexDirection={"column"}>
      <Box>
        <Typography variant="h1">{t("bookmarks.heading")}</Typography>
        <FilterPanel />
      </Box>
      <Box>
        {isLoading && <Loader />}
        {isTicketsSuccess &&
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
                      key={ticket.ticket_id}
                    />
                  );
                })}
              </FormGroup>
              <CustomPagination
                total={totalPage}
                current={currentPage}
                onChange={handlePageChange}
              />
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

export { Bookmarks };
