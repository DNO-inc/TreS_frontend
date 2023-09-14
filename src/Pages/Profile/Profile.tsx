import { FC, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Avatar, useTheme } from "@mui/material";

import { useGetProfileMutation } from "../../store/api/profile/profile.api";
import IPalette from "../../theme/IPalette.interface";

const Profile: FC = () => {
  const { t } = useTranslation();
  const { palette }: IPalette = useTheme();
  const { pathname } = useLocation();

  const userId = pathname.split("/")[2];

  const [getProfile, { data, isSuccess }] = useGetProfileMutation();

  useEffect(() => {
    getProfile({ userId: userId });
  }, []);

  return (
    <Grid container>
      <Box>
        <Typography variant="h1">{t("profile.heading")}</Typography>
      </Box>
      {isSuccess && (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 5, mt: 15 }}>
          <Box sx={{ display: "flex", gap: 5 }}>
            <Avatar sx={{ width: 100, height: 100 }} />
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography
                component={"h2"}
                sx={{
                  fontSize: 32,
                  fontWeight: 600,
                  color: palette.semantic.info,
                }}
              >{`${data.firstname} ${data.lastname}`}</Typography>
              <Typography
                sx={{ fontSize: 24, color: palette.whiteAlpha.default }}
              >
                {data?.login ? data.login : t("common.notFound")}
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              bgcolor: palette.grey.divider,
              minWidth: "500px",
              p: 3,
              "& > .MuiBox-root:not(:first-of-type)": {
                mt: 2,
              },
              "& > .MuiBox-root": {
                display: "flex",
                justifyContent: "space-between",
                "& > .MuiTypography-root:first-of-type": {
                  fontWeight: 500,
                },
              },
            }}
          >
            <Box>
              <Typography>{t("profile.email")}</Typography>
              <Typography>
                {data?.email ? data.email : t("common.notFound")}
              </Typography>
            </Box>
            <Box>
              <Typography>{t("profile.faculty")}</Typography>
              <Typography>
                {data?.faculty?.name ? data.faculty.name : t("common.notFound")}
              </Typography>
            </Box>
            <Box>
              <Typography>{t("profile.group")}</Typography>
              <Typography>
                {data?.group?.name ? data.group.name : t("common.notFound")}
              </Typography>
            </Box>
            <Box>
              <Typography>{t("profile.phone")}</Typography>
              <Typography>
                {data?.phone ? data.phone : t("common.notFound")}
              </Typography>
            </Box>
          </Box>
        </Box>
      )}
    </Grid>
  );
};

export { Profile };
