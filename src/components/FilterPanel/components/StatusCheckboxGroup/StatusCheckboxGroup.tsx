import { FC, useState } from "react";
import { useTranslation } from "react-i18next";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import useMediaQuery from "@mui/material/useMediaQuery";
import useTheme from "@mui/material/styles/useTheme";

import FilterAltIcon from "@mui/icons-material/FilterAlt";

import { VerticalDivider } from "../../../VerticalDivider";

import { useGetStatusesFullInfo } from "./hooks/useGetStatusesFullInfo";
import IPalette from "../../../../theme/IPalette.interface";
import { dimensions, urlKeys } from "../../../../constants";
import { useChangeURL } from "../../../../shared/hooks";
import { CustomCheckbox } from "./components/CustomCheckbox";

interface StatusCheckboxGroupProps {
  isAllStatuses: boolean;
}

const StatusCheckboxGroup: FC<StatusCheckboxGroupProps> = ({
  isAllStatuses,
}) => {
  const { t } = useTranslation();
  const { palette }: IPalette = useTheme();
  const matches = useMediaQuery(
    `(max-width: ${dimensions.BREAK_POINTS.STATUSES_FILTER}px)`
  );

  const [isOpen, setIsOpen] = useState(false);

  const putStatusesInURL = useChangeURL();

  const [statusesFullInfo, checked] = useGetStatusesFullInfo(isAllStatuses);
  const isAllUnchecked: boolean = checked && !checked.some(value => value);

  const handleParentChange = () => {
    const updatedChecked = checked.map(() => false);

    const selectedStatuses = statusesFullInfo
      .filter(status => updatedChecked[status.id])
      .map(status => status.name.toLowerCase())
      .join(",");

    putStatusesInURL(urlKeys.STATUSES, selectedStatuses, true);
  };

  const handleFilterOpen = () => {
    setIsOpen(prevState => !prevState);
  };

  return (
    <>
      {matches && (
        <IconButton
          sx={{
            position: "relative",
            borderRadius: 1,
            border: `2px solid ${palette.grey.border}`,
          }}
          onClick={handleFilterOpen}
        >
          <FilterAltIcon />
        </IconButton>
      )}
      {matches ? (
        isOpen && (
          <Box
            sx={{
              position: "absolute",
              top: 125,
              left: 16,
              width: 200,
              bgcolor: palette.grey.divider,
              border: `2px solid ${palette.grey.button}`,
              borderRadius: 1,
              p: "8px 16px",
              zIndex: 20,
            }}
          >
            <Button
              color="inherit"
              onClick={handleParentChange}
              disabled={isAllUnchecked}
              sx={{ textTransform: "initial" }}
            >
              {t("statusesFilter.reset")}
            </Button>
            <Divider sx={{ mt: 0.5, borderWidth: 1 }} />
            <Box sx={{ display: "flex", flexWrap: "wrap", ml: 2 }}>
              {statusesFullInfo.map(status => {
                return <CustomCheckbox status={status} key={status.id} />;
              })}
            </Box>
          </Box>
        )
      ) : (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Button
            color="inherit"
            variant="contained"
            onClick={handleParentChange}
            disabled={isAllUnchecked}
            sx={{ mr: 1, textTransform: "initial" }}
          >
            {t("statusesFilter.reset")}
          </Button>
          <VerticalDivider />
          <Box sx={{ display: "flex", flexWrap: "wrap", ml: 2 }}>
            {statusesFullInfo.map(status => {
              return <CustomCheckbox status={status} key={status.id} />;
            })}
          </Box>
        </Box>
      )}
    </>
  );
};

export { StatusCheckboxGroup };
