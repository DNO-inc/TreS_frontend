import { ChangeEvent, FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";

import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { IconButton, useMediaQuery, useTheme } from "@mui/material";

import FilterAltIcon from "@mui/icons-material/FilterAlt";

import { VerticalDivider } from "../../../VerticalDivider";

import { useGetStatusesFullObject, useGetStatusesName } from "./getStatuses";
import IPalette from "../../../../theme/IPalette.interface";

interface StatusCheckboxGroupProps {
  isAllStatuses: boolean;
}

const StatusCheckboxGroup: FC<StatusCheckboxGroupProps> = ({
  isAllStatuses,
}) => {
  const { t } = useTranslation();
  const { palette }: IPalette = useTheme();
  const matches = useMediaQuery("(max-width: 1260px)");
  const [searchParams, setSearchParams] = useSearchParams();

  const [isOpen, setIsOpen] = useState(false);

  const statusesName: string[] = useGetStatusesName(isAllStatuses);
  const statusesQueryParams: string[] | undefined = searchParams
    .get("statuses")
    ?.split(",");

  const checked: boolean[] = statusesQueryParams
    ? statusesName.map(status => {
        return statusesQueryParams.includes(status);
      })
    : statusesName.map(() => true);

  const processSelectStatus = (updatedChecked: boolean[]): void => {
    const params = new URLSearchParams(searchParams.toString());

    const selectedStatuses = statusesFullInfo
      .filter(status => updatedChecked[status.id])
      .map(status => status.query);

    if (params.has("statuses")) {
      params.set("statuses", selectedStatuses.join(","));
    } else {
      params.append("statuses", selectedStatuses.join(","));
    }

    if (params.has("current_page")) {
      params.set("current_page", "1");
    } else {
      params.append("current_page", "1");
    }

    setSearchParams(params);
  };

  const handleChange =
    (index: number) =>
    (event: ChangeEvent<HTMLInputElement>): void => {
      const updatedChecked = [...checked];
      updatedChecked[index] = event.target.checked;

      processSelectStatus(updatedChecked);
    };

  const handleParentChange = (event: ChangeEvent<HTMLInputElement>) => {
    const updatedChecked = checked.map(() => event.target.checked);

    processSelectStatus(updatedChecked);
  };

  const statusesFullInfo = useGetStatusesFullObject(
    checked,
    isAllStatuses,
    handleChange
  );

  const children: JSX.Element = (
    <Box sx={{ display: "flex", flexWrap: "wrap", ml: 2 }}>
      {statusesFullInfo.map(status => {
        return (
          <FormControlLabel
            label={status.label}
            control={
              <Box sx={{ position: "relative" }}>
                <Checkbox
                  checked={status.checked}
                  onChange={status.onChange}
                  sx={{
                    color: status.color,
                    zIndex: 1,
                    "&.Mui-checked": {
                      color: status.color,
                    },
                  }}
                />
                {status.checked && (
                  <Box
                    sx={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      width: 13,
                      height: 13,
                      bgcolor:
                        status.color === "#FFFFFF" ? "#000000" : "#ffffff",
                      transform: "translate(-50%, -50%)",
                    }}
                  ></Box>
                )}
              </Box>
            }
            key={status.id}
          />
        );
      })}
    </Box>
  );

  const isAllChecked: boolean = !!checked && checked.every(value => value);
  const isSomeChecked: boolean = checked.some(value => value);

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
              borderRadius: 1,
              p: "8px 16px",
              zIndex: 20,
            }}
          >
            <FormControlLabel
              label={t("statusesFilter.all")}
              control={
                <Checkbox
                  checked={isAllChecked}
                  indeterminate={!isAllChecked && isSomeChecked}
                  onChange={handleParentChange}
                  sx={{
                    color: "#ffffff",
                    zIndex: 1,
                    "& > .MuiSvgIcon-root": {
                      color: "#ffffff",
                    },
                  }}
                />
              }
            />
            {children}
          </Box>
        )
      ) : (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <FormControlLabel
            label={t("statusesFilter.all")}
            control={
              <Checkbox
                checked={isAllChecked}
                indeterminate={!isAllChecked && isSomeChecked}
                onChange={handleParentChange}
                sx={{
                  color: "#ffffff",
                  zIndex: 1,
                  "& > .MuiSvgIcon-root": {
                    color: "#ffffff",
                  },
                }}
              />
            }
          />
          <VerticalDivider />
          {children}
        </Box>
      )}
    </>
  );
};

export { StatusCheckboxGroup };
