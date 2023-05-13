import { Grid, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Ticket } from "../../Ticket/Ticket";

const GeneralTickets = () => {
  const { t } = useTranslation();

  const ticket = {
    ticket_id: 1,
    issuer: 1,
    assignee: 1,
    subject:
      "Lorem ipsum dolor sit Lorem ipsum dolor sit Lorem ipsum dolor sit Lorem ipsum dolor sit ",
    body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos voluptate voluptatibus, vero explicabo odio minus nemo distinctio. Quisquam eum, placeat quibusdam natus quas accusantium praesentium asperiores perferendis dolores, iure quidem neque repudiandae animi ad porro esse laudantium laborum minima eveniet cupiditate sequi quam. Consequuntur, fuga repellat. Ipsum cupiditate ullam expedita!",
    hidden: false,
    anonymous: false,
    upvotes: 12,
    created: "12.01.2020",
    faculty_id: 1,
    tag_id: 1,
    status_id: 1,
  };

  return (
    <Grid container>
      <Typography variant="h4">{t("generalTickets.heading")}</Typography>
      <Grid container gap={2}>
        <Ticket ticket={ticket} />
        <Ticket ticket={ticket} />
        <Ticket ticket={ticket} />
        <Ticket ticket={ticket} />
        <Ticket ticket={ticket} />
        <Ticket ticket={ticket} />
        <Ticket ticket={ticket} />
        <Ticket ticket={ticket} />
        <Ticket ticket={ticket} />
        <Ticket ticket={ticket} />
        <Ticket ticket={ticket} />
      </Grid>
    </Grid>
  );
};

GeneralTickets.propTypes = {};

export { GeneralTickets };
