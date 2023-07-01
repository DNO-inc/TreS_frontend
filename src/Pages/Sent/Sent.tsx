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

import { useGetTicketsMutation } from "../../store/api/tickets/tickets.api";
import { useJwtDecode } from "../../shared/hooks";
import { useGetFacultiesQuery, useGetStatusesQuery } from "../../store/api/api";

interface SentPageInfo {
  data?: {
    ticket_list: ITicket[];
    total_pages: number;
  };
  error?: FetchBaseQueryError | SerializedError;
}

const Sent: FC = () => {
  const { t } = useTranslation();

  const [tickets, setTickets] = useState<ITicket[]>([]);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [facultyId, setFacultyId] = useState<number | null>(null);

  const jwt = useJwtDecode();
  const [geTickets, { isLoading, isSuccess: isTicketsSuccess }] =
    useGetTicketsMutation();
  const faculties = useGetFacultiesQuery({});
  const statuses = useGetStatusesQuery({});

  const [searchParams, setSearchParams] = useSearchParams();
  const ticketsPerRow: number = 10;
  const currentPage: number = Number(searchParams.get("current_page")) || 1;
  const facultyQuery: string | null = searchParams.get("faculty");

  const option: string = jwt ? "tickets" : "anon";
  const userId: boolean | number = jwt && JSON.parse(jwt.sub)?.user_id;

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
      creator: userId,
      start_page: currentPage,
      faculty: facultyId,
      status: matchingStatusesId,
    };
  }, [currentPage, facultyId, searchParams, statuses.isSuccess]);

  useEffect(() => {
    geTickets({ option: option, body: JSON.stringify(requestBody) }).then(
      (res: SentPageInfo): void | PromiseLike<void> => {
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
        <Typography variant="h1">{t("sent.heading")}</Typography>
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

export { Sent };
