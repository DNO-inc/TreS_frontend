import { FC, Dispatch, SetStateAction } from "react";
import { useTranslation } from "react-i18next";

import useTheme from "@mui/material/styles/useTheme";
import { Button, Grid, Typography, useMediaQuery } from "@mui/material";

import IPalette from "../../../../theme/IPalette.interface";

interface ConfirmStepProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const ConfirmStep: FC<ConfirmStepProps> = ({ setOpen }) => {
  const { t } = useTranslation();
  const { palette }: IPalette = useTheme();
  const matches = useMediaQuery("(max-width: 500px)");

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Grid
      container
      sx={{
        flexDirection: "column",
        alignItems: "center",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        borderRadius: 4,
        gap: matches ? 3 : 4,
        width: matches ? "90vw" : 450,
        bgcolor: palette.grey.border,
        border: `2px solid ${palette.grey.active}`,
        p: matches ? "24px" : "32px 56px",
      }}
    >
      <Typography id="modal-modal-title" variant="h6" component="h2">
        {t("login.confirm.header")}
      </Typography>
      <Typography
        id="modal-modal-title"
        sx={{
          fontSize: 16,
          color: palette.whiteAlpha.default,
          textAlign: "center",
        }}
      >
        {t("login.confirm.description")}
      </Typography>
      <Button variant="contained" color="primary" onClick={handleClose}>
        {t("login.confirm.close")}
      </Button>
    </Grid>
  );
};

export { ConfirmStep };
