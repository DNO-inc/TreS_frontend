import { useEffect, useState } from "react";
import { Grid, Typography, useMediaQuery } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Ticket } from "../../components/Ticket/Ticket";
import { useGetTicketsMutation } from "../../store/api/tickets/tickets.api";
import { useJwtDecode } from "../../shared/hooks";
import { Loader } from "../../components/Loader";
import { FilterPanel } from "./components/FilterPanel";
import { CustomPagination } from "./components/CustomPagination";
import { useSearchParams } from "react-router-dom";

const GeneralTickets = () => {
  const { t } = useTranslation();
  const [tickets, setTickets] = useState([]);
  const jwt = useJwtDecode();
  const matches = useMediaQuery("(min-width:600px)");
  const [geTickets, { isLoading, isSuccess }] = useGetTicketsMutation();

  const [searchParams, setSearchParams] = useSearchParams();
  const ticketsPerRow = +searchParams.get("ticket_per_row") || 2;
  const currentPage = +searchParams.get("current_page") || 1;
  const faculty =
    searchParams.get("faculty") !== "all_faculties"
      ? searchParams.get("faculty")
      : "";
  const statuses = searchParams.get("statuses")?.split(",") || [];
  const [totalPage, setTotalPage] = useState(1);

  const option = jwt ? "tickets" : "anon";
  const requestBody = {
    start_page: currentPage,
    tickets_count: 3 * ticketsPerRow,
    faculty: faculty,
    status: statuses,
  };

  useEffect(() => {
    geTickets({ option: option, body: JSON.stringify(requestBody) }).then(
      res => {
        setTickets(res.data.ticket_list);
        setTotalPage(res.data.total_pages);
      }
    );
  }, [option, searchParams]);

  const handlePageChange = page => {
    const params = new URLSearchParams(searchParams.toString());

    if (params.has("current_page")) {
      params.set("current_page", page);
    } else {
      params.append("current_page", page);
    }

    setSearchParams(params);
  };

  return (
    <Grid container flexDirection={"column"}>
      <Typography variant="h1">{t("generalTickets.heading")}</Typography>
      <FilterPanel ticketsPerRow={ticketsPerRow} />
      {isLoading && <Loader />}
      {isSuccess &&
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
    </Grid>
  );
};

GeneralTickets.propTypes = {};

export { GeneralTickets };
