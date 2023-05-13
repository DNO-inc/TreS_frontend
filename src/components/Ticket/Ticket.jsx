import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import { useTranslation } from "react-i18next";
import { useTheme } from "@emotion/react";
import { Box, Divider, Grid } from "@mui/material";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";
import DoNotDisturbAltOutlinedIcon from "@mui/icons-material/DoNotDisturbAltOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";

const Ticket = ({ ticket }) => {
  const { t } = useTranslation();
  const { palette } = useTheme();

  return (
    <Card
      sx={{
        maxWidth: 514,
        height: 332,
        bgcolor: palette.grey.card,
        border: `2px solid ${palette.grey.border}`,

        "& > div > div": {
          p: 2,
        },
        "& > div > hr": {
          bgcolor: palette.grey.border,
          ml: 2,
          mr: 2,
        },
      }}
    >
      <Grid
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          borderLeft: `12px solid ${palette.semantic.info}`,
        }}
      >
        <Box maxHeight={80}>
          <Grid
            container
            flexWrap={"nowrap"}
            justifyContent={"space-between"}
            gap={10}
          >
            <Typography noWrap={true}>{ticket.subject}</Typography>
            <Grid gap={1} display={"flex"}>
              <Box
                sx={{
                  textAlign: "center",
                  lineHeight: "24px",
                  width: 60,
                  height: 24,
                  bgcolor: palette.semantic.info,
                  borderRadius: 1,
                }}
              >
                Open
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 24,
                  height: 24,
                  bgcolor: palette.grey.active,
                  borderRadius: 1,
                }}
              >
                <FlagOutlinedIcon fontSize={"12px"} />
              </Box>
            </Grid>
          </Grid>
          <Typography color={palette.whiteAlpha[600]}>
            Biased assessment
          </Typography>
        </Box>
        <Divider />
        <Grid>
          <Box maxHeight={120} overflow={"hidden"}>
            <Typography variant="body2" color="text.secondary">
              {ticket.body}
            </Typography>
          </Box>
          <Grid
            sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}
          >
            <Typography color="text.secondary">@user_name</Typography>
            <Typography color="text.secondary">ELIT</Typography>
          </Grid>
        </Grid>
        <Divider />
        <Grid container maxHeight={56} justifyContent={"space-between"}>
          <Typography fontSize={14}>{ticket.created}</Typography>
          <Grid
            display={"flex"}
            gap={1}
            sx={{
              "& > svg": {
                fontSize: 24,
              },
            }}
          >
            <DoNotDisturbAltOutlinedIcon />
            <BookmarkBorderOutlinedIcon />
            <FavoriteBorderOutlinedIcon />
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
};

Ticket.propTypes = {};

export { Ticket };
