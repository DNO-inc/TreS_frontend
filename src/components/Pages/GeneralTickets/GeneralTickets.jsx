import { useState } from "react";
import { Button, Grid, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Ticket } from "../../Ticket/Ticket";

const GeneralTickets = ({ isAuth }) => {
  const { t } = useTranslation();
  const [ticketsPerRow, setTicketsPerRow] = useState(2);

  const tickets = [
    {
      ticket_id: 1,
      status: "open",
      subject:
        "Lorem ipsum dolor sit Lorem ipsum dolor sit Lorem ipsum dolor sit Lorem ipsum dolor sit ",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos voluptate voluptatibus, vero explicabo odio minus nemo distinctio. Quisquam eum, placeat quibusdam natus quas accusantium praesentium asperiores perferendis dolores, iure quidem neque repudiandae animi ad porro esse laudantium laborum minima eveniet cupiditate sequi quam. Consequuntur, fuga repellat. Ipsum cupiditate ullam expedita!",
      created: "12.01.2020",
    },
    {
      ticket_id: 2,
      status: "closed",
      subject:
        "Lorem ipsum dolor sit Lorem ipsum dolor sit Lorem ipsum dolor sit Lorem ipsum dolor sit ",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos voluptate voluptatibus, vero explicabo odio minus nemo distinctio. ",
      created: "12.01.2020",
    },
    {
      ticket_id: 3,
      status: "accepted",
      subject:
        "Lorem ipsum dolor sit Lorem ipsum dolor sit Lorem ipsum dolor sit Lorem ipsum dolor sit ",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      created: "12.01.2020",
    },
    {
      ticket_id: 4,
      status: "rejected",
      subject:
        "Lorem ipsum dolor sit Lorem ipsum dolor sit Lorem ipsum dolor sit Lorem ipsum dolor sit ",
      body: "Quisquam eum, placeat quibusdam natus quas accusantium praesentium asperiores perferendis dolores, iure quidem neque repudiandae animi ad porro esse laudantium laborum minima eveniet cupiditate sequi quam. Consequuntur, fuga repellat. Ipsum cupiditate ullam expedita!",
      created: "12.01.2020",
    },
    {
      ticket_id: 5,
      status: "open",
      subject:
        "Lorem ipsum dolor sit Lorem ipsum dolor sit Lorem ipsum dolor sit Lorem ipsum dolor sit ",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos voluptate voluptatibus, vero explicabo odio minus nemo distinctio. Quisquam eum, placeat quibusdam natus quas accusantium praesentium asperiores perferendis dolores, iure quidem neque repudiandae animi ad porro esse laudantium laborum minima eveniet cupiditate sequi quam. Consequuntur, fuga repellat. Ipsum cupiditate ullam expedita!",
      created: "12.01.2020",
    },
  ];

  return (
    <Grid container>
      <Typography variant="h4">{t("generalTickets.heading")}</Typography>
      <Button
        onClick={() => {
          setTicketsPerRow(2);
        }}
      >
        2
      </Button>
      <Button
        onClick={() => {
          setTicketsPerRow(3);
        }}
      >
        3
      </Button>
      <Grid container gap={2}>
        {tickets.map(ticket => {
          return (
            <Ticket
              ticketsPerRow={ticketsPerRow}
              ticket={ticket}
              isAuth={isAuth}
              key={ticket.ticket_id}
            />
          );
        })}
      </Grid>
    </Grid>
  );
};

GeneralTickets.propTypes = {};

export { GeneralTickets };
