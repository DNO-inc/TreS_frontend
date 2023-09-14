import SvgIcon from "@mui/material/SvgIcon";

import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";
import HandshakeOutlinedIcon from "@mui/icons-material/HandshakeOutlined";
import BuildIcon from "@mui/icons-material/Build";

import { useTranslation } from "react-i18next";

const useCheckScope = (scope: string) => {
  const { t } = useTranslation();

  switch (scope) {
    case "Q/A":
      return {
        icon: (
          <SvgIcon>
            <HelpOutlineIcon />
          </SvgIcon>
        ),
        tooltipText: t("common.tooltip.question"),
      };
    case "Reports":
      return {
        icon: (
          <SvgIcon>
            <FlagOutlinedIcon />
          </SvgIcon>
        ),
        tooltipText: t("common.tooltip.report"),
      };
    case "Suggestion":
      return {
        icon: (
          <SvgIcon>
            <HandshakeOutlinedIcon />
          </SvgIcon>
        ),
        tooltipText: t("common.tooltip.suggestion"),
      };
    default:
      return {
        icon: (
          <SvgIcon>
            <BuildIcon />
          </SvgIcon>
        ),
        tooltipText: t("common.tooltip.notSelected"),
      };
  }
};

export { useCheckScope };
