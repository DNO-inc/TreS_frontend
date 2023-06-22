import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";
import HandshakeOutlinedIcon from "@mui/icons-material/HandshakeOutlined";
import { useTranslation } from "react-i18next";

const useCheckScope = (scope: string) => {
  const { t } = useTranslation();

  switch (scope) {
    case "Q/A":
      return {
        icon: <HelpOutlineIcon fontSize={"12px"} />,
        tooltipText: t("common.tooltip.question"),
      };
    case "Reports":
      return {
        icon: <FlagOutlinedIcon fontSize={"12px"} />,
        tooltipText: t("common.tooltip.report"),
      };
    case "Suggestion":
      return {
        icon: <HandshakeOutlinedIcon fontSize={"12px"} />,
        tooltipText: t("common.tooltip.suggestion"),
      };
    default:
      return {
        icon: <HandshakeOutlinedIcon fontSize={"12px"} />,
        tooltipText: t("common.tooltip.suggestion"),
      };
  }
};

export { useCheckScope };
