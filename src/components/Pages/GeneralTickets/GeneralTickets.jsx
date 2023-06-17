import { useEffect, useState } from "react";
import { Grid, Typography, useMediaQuery } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Ticket } from "../../Ticket/Ticket";
import { useGetTicketsMutation } from "../../../store/api/tickets/tickets.api";
import { useJwtDecode } from "../../../shared/hooks";
import { Loader } from "../../Loader";
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
  const [totalPage, setTotalPage] = useState(1);

  const [requestBody, setRequestBody] = useState({
    start_page: currentPage,
    tickets_count: 3 * ticketsPerRow,
  });

  const option = jwt ? "tickets" : "anon";

  useEffect(() => {
    geTickets({ option: option, body: JSON.stringify(requestBody) }).then(
      res => {
        setTickets(res.data.ticket_list);
        setTotalPage(res.data.total_pages);
      }
    );
  }, [option, requestBody]);

  const handlePageChange = page => {
    const params = new URLSearchParams(searchParams.toString());

    if (params.has("current_page")) {
      params.set("current_page", page);
    } else {
      params.append("current_page", page);
    }

    setSearchParams(params);

    setRequestBody(prevBody => ({ ...prevBody, start_page: page }));
  };

  return (
    <Grid container flexDirection={"column"}>
      <Typography variant="h1">{t("generalTickets.heading")}</Typography>
      <FilterPanel
        ticketsPerRow={ticketsPerRow}
        setRequestBody={setRequestBody}
      />
      {isLoading && <Loader />}
      {!isSuccess || !tickets.length ? (
        <Typography variant="h1" mt={6}>
          Not found
        </Typography>
      ) : (
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
      )}
    </Grid>
  );
};

GeneralTickets.propTypes = {};

export { GeneralTickets };
