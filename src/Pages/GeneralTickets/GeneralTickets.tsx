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

import { useGetTicketsMutation } from "../../store/api/tickets/tickets.api";
import { useJwtDecode } from "../../shared/hooks";
import { useGetFacultiesQuery, useGetStatusesQuery } from "../../store/api/api";
import { ITicket } from "../../components/Ticket/ticket.interface";

interface GeneralTicketsPageInfo {
  data?: {
    ticket_list: ITicket[];
    total_pages: number;
  };
  error?: FetchBaseQueryError | SerializedError;
}

const GeneralTickets: FC = () => {
  const { t } = useTranslation();

  const [tickets, setTickets] = useState<ITicket[]>([]);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [facultyId, setFacultyId] = useState<number | null>(null);

  const jwt = useJwtDecode();
  const [geTickets, { isLoading, isSuccess: isTicketsSuccess }] =
    useGetTicketsMutation();
  const faculties = useGetFacultiesQuery({});
  const statuses = useGetStatusesQuery({});

  const [searchParams] = useSearchParams();
  const currentPage: number = Number(searchParams.get("current_page")) || 1;
  const facultyQuery: string | null = searchParams.get("faculty");

  const option: string = jwt ? "tickets" : "anon";
  const ticketsPerRow: number = Math.round(window.innerWidth / 600);

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
      items_count: ticketsPerRow * 4,
      faculty: facultyId,
      status: matchingStatusesId,
    };
  }, [option, facultyId, searchParams]);

  useEffect(() => {
    geTickets({
      option: option,
      body: JSON.stringify(requestBody),
    }).then((res: GeneralTicketsPageInfo): void | PromiseLike<void> => {
      if (res.data) {
        setTickets(res.data.ticket_list);
        setTotalPage(res.data.total_pages);
      }
    });
  }, [requestBody]);

  return (
    <Grid container flexDirection={"column"}>
      <Box>
        <Typography variant="h1" sx={{ mb: 2 }}>
          {t("generalTickets.heading")}
        </Typography>
        <FilterPanel />
      </Box>
      <Box sx={{ pt: 20 }}>
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
                      isAuth={!!jwt}
                      key={ticket.ticket_id}
                    />
                  );
                })}
              </Grid>
              <CustomPagination total={totalPage} current={currentPage} />
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
