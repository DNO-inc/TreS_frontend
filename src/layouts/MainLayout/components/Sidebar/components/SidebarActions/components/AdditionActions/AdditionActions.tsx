import { useEffect, useState, FC } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import List from "@mui/material/List";
import useTheme from "@mui/material/styles/useTheme";

import { endpoints } from "../../../../../../../../constants";
import { useAuth } from "../../../../../../../../context/AuthContext/AuthContext";
import { Button, useMediaQuery } from "@mui/material";

interface AdditionActionsProps {
  selectedKey: string;
  setSelectedKey: (key: string) => void;
}

const AdditionActions: FC<AdditionActionsProps> = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const matches = useMediaQuery("(max-width: 600px)");
  const { t } = useTranslation();

  const { isAuth } = useAuth();

  const [checked, setChecked] = useState<boolean>(
    theme.palette.mode === "dark"
  );

  const handleRedirect = (): void => {
    navigate(endpoints.GENERAL_TICKETS);
  };

  useEffect(() => {
    setChecked(!checked);
  }, [theme.palette.mode]);

  return (
    <List
      sx={{
        "& >  li > a > div": {
          borderRadius: "8px",
        },
        "& > li": {
          padding: "4px 16px",
        },
        "& > li > a": {
          width: "100%",
        },
      }}
    >
      {matches && (
        <Button
          onClick={handleRedirect}
          disabled={!isAuth}
          variant={"contained"}
          sx={{
            fontSize: 14,
            textTransform: "none",
            width: "100%",
            mt: 2,
            border: "none",
          }}
        >
          {t("common.createButton")}
        </Button>
      )}
    </List>
  );
};

export { AdditionActions };
