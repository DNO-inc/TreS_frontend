import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import List from "@mui/material/List";
import Button from "@mui/material/Button";
import useMediaQuery from "@mui/material/useMediaQuery";

import { dimensions, endpoints } from "constants";
import { useAuth } from "context/AuthContext/AuthContext";

interface AdditionActionsProps {
  selectedKey: string;
  setSelectedKey: (key: string) => void;
}

const AdditionActions: FC<AdditionActionsProps> = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const matches = useMediaQuery(
    `(max-width: ${dimensions.BREAK_POINTS.ADDITION_ACTIONS}px)`
  );

  const { isAuth } = useAuth();

  const handleRedirect = (): void => {
    navigate(endpoints.CREATE_TICKET);
  };

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
