import { useEffect, useState, FC, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { SerializedError } from "@reduxjs/toolkit";

import { Box, Grid, Typography, useMediaQuery } from "@mui/material";

import { FilterPanel } from "./components/FilterPanel";
import { Ticket } from "../../components/Ticket/Ticket";
import { Loader } from "../../components/Loader";
import { CustomPagination } from "./components/CustomPagination";

import { useGetTicketsMutation } from "../../store/api/tickets/tickets.api";
import { useJwtDecode } from "../../shared/hooks";
import { useGetFacultiesQuery, useGetStatusesQuery } from "../../store/api/api";

interface GeneralTicketsPageInfo {
  data?: {
    ticket_list: ITicket[];
    total_pages: number;
  };
  error?: FetchBaseQueryError | SerializedError;
}

const GeneralTickets: FC = () => {
  const { t } = useTranslation();
  const matches = useMediaQuery("(min-width:600px)");

  const [tickets, setTickets] = useState<ITicket[]>([]);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [facultyId, setFacultyId] = useState<number | null>(null);

  const jwt = useJwtDecode();
  const [geTickets, { isLoading, isSuccess: isTicketsSuccess }] =
    useGetTicketsMutation();
  const faculties = useGetFacultiesQuery({});
  const statuses = useGetStatusesQuery({});

  const [searchParams, setSearchParams] = useSearchParams();
  const ticketsPerRow: number = Number(searchParams.get("ticket_per_row")) || 2;
  const currentPage: number = Number(searchParams.get("current_page")) || 1;
  const facultyQuery: string | null = searchParams.get("faculty");

  const option: string = jwt ? "tickets" : "anon";

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
      tickets_count: 3 * ticketsPerRow,
      faculty: facultyId,
      status: matchingStatusesId,
    };
  }, [currentPage, ticketsPerRow, facultyId, searchParams, statuses.isSuccess]);

  useEffect(() => {
    geTickets({ option: option, body: JSON.stringify(requestBody) }).then(
      (res: GeneralTicketsPageInfo): void | PromiseLike<void> => {
        if (res.data) {
          setTickets(res.data.ticket_list);
          setTotalPage(res.data.total_pages);
        }
      }
    );
  }, [option, searchParams, geTickets, requestBody]);

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
        <Typography variant="h1" sx={{ mb: 3 }}>
          {t("generalTickets.heading")}
        </Typography>
        <FilterPanel ticketsPerRow={ticketsPerRow} />
      </Box>
      <Box sx={{ pt: "168px !important" }}>
        {isLoading && <Loader />}
        {isTicketsSuccess &&
          (tickets.length ? (
            <>
              <Grid
                container
                gap={2}
                sx={{
                  flexDirection: matches ? "row" : "column",
                  maxWidth: matches ? "100%" : "600px",
                }}
              >
                {tickets.map(ticket => {
                  return (
                    <Ticket
                      ticketsPerRow={matches ? ticketsPerRow : 1}
                      ticket={ticket}
                      isAuth={!!jwt}
                      key={ticket.ticket_id}
                    />
                  );
                })}
              </Grid>
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

export { GeneralTickets };
