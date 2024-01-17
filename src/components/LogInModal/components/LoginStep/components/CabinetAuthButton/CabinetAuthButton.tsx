import { useTranslation } from "react-i18next";

import Button from "@mui/material/Button";

import { general } from "../../../../../../constants";

const CabinetAuthButton = () => {
  const { t } = useTranslation();
  let authWindow: Window | null;

  const popupWindow = (
    url: string,
    windowName: string,
    w: number,
    h: number
  ) => {
    if (!window || !window.top) {
      console.error("Window object or its top property is null or undefined");
      return null;
    }

    const x = window.top.outerWidth / 2 + window.top.screenX - w / 2;
    const y = window.top.outerHeight / 2 + window.top.screenY - h / 2;

    return window.open(
      url,
      windowName,
      `width=${w}, height=${h}, top=${y}, left=${x}`
    );
  };

  const openAuth = () => {
    if (authWindow && !authWindow.closed) {
      authWindow.focus();
    } else {
      authWindow = popupWindow(
        `https://cabinet.sumdu.edu.ua/index/service/${general.TRES_TOKEN}`,
        "_self",
        general.CABINET_POPUP_WIDTH,
        general.CABINET_POPUP_HEIGHT
      );
    }
  };

  return (
    <Button
      color="success"
      variant="contained"
      onClick={openAuth}
      sx={{ color: "#fff" }}
    >
      {t("login.cabinetButton")}
    </Button>
  );
};

export { CabinetAuthButton };
