import { FC } from "react";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import useTheme from "@mui/material/styles/useTheme";

import { MarkdownWithStyles } from "../../../../utils/markdown";

import { ProfileTooltip } from "./components/ProfileTooltip";

import { Creator } from "../../ticket.interface";
import IPalette from "../../../../theme/IPalette.interface";
import { useAuth } from "../../../../context/AuthContext/AuthContext";

export interface ICreator {
  faculty: { faculty_id: number; name: string };
  firstname: string;
  group?: { group_id: number; name: string } | undefined;
  lastname: string;
  login: string;
  user_id: number | null;
}
interface TicketBodyProps extends Creator {
  isMyTicket: boolean;
  body: string;
  creator: ICreator;
  faculty: string;
  isHiddenTicket: boolean;
}

const TicketBody: FC<TicketBodyProps> = ({
  body,
  creator,
  faculty,
  isHiddenTicket,
}) => {
  const { palette }: IPalette = useTheme();

  const { isAuth } = useAuth();

  const creatorLogin = creator?.login;
  let userLogin = "anonymous";

  if (creator) {
    if (creatorLogin) {
      userLogin = `@${creatorLogin}`;
    } else {
      userLogin = "@login";
    }
  }

  return (
    <Grid
      display={"flex"}
      flexDirection={"column"}
      sx={{ position: "relative", flexGrow: 1, maxHeight: "188px" }}
    >
      <Box
        sx={{
          overflow: "hidden",
          flexGrow: 1,
          "&::after": isHiddenTicket
            ? {}
            : {
                content: `""`,
                position: "absolute",
                bottom: 48,
                left: 0,
                width: "100%",
                height: "56px",
                background: `linear-gradient(transparent, ${palette.grey.card})`,
              },
        }}
      >
        <Typography
          variant="body2"
          component="div"
          color="text.secondary"
          sx={{
            whiteSpace: "pre-line",
            overflowWrap: "break-word",
            maxWidth: "100%",
          }}
        >
          <MarkdownWithStyles innerText={body} />
        </Typography>
      </Box>
      <Grid sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
        {isAuth && creator ? (
          <ProfileTooltip creator={creator} userLogin={userLogin} />
        ) : (
          <Typography color="text.secondary" className="evadeItem">
            {userLogin}
          </Typography>
        )}
        <Typography color="text.secondary">{faculty}</Typography>
      </Grid>
    </Grid>
  );
};

export { TicketBody };
