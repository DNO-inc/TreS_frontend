import { Box, Checkbox, FormControlLabel } from "@mui/material";
import { VerticalDivider } from "../../../../../../VerticalDivider";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getStatusesFullObject, getStatusesName } from "./getStatuses";
import { useEffect } from "react";

const StatusCheckboxGroup = ({ setRequestBody }) => {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();

  const statusesName = getStatusesName();
  const statusesQueryParams = searchParams.get("statuses")?.split(",");

  const checked = statusesQueryParams
    ? statusesName.map(status => {
        return statusesQueryParams.includes(status);
      })
    : [true, true, true, true];

  useEffect(() => {
    setRequestBody(prevBody => ({ ...prevBody, status: statusesQueryParams }));
  }, []);

  const processSelectStatus = updatedChecked => {
    const params = new URLSearchParams(searchParams.toString());

    const selectedStatuses = statusesFullInfo
      .filter(status => updatedChecked[status.id])
      .map(status => status.label);

    if (params.has("statuses")) {
      params.set("statuses", selectedStatuses);
    } else {
      params.append("statuses", selectedStatuses);
    }

    if (params.has("current_page")) {
      params.set("current_page", 1);
    } else {
      params.append("current_page", 1);
    }

    setSearchParams(params);

    setRequestBody(prevBody => ({ ...prevBody, status: selectedStatuses }));
  };

  const handleChange = index => event => {
    const updatedChecked = [...checked];
    updatedChecked[index] = event.target.checked;

    processSelectStatus(updatedChecked);
  };

  const handleParentChange = event => {
    const updatedChecked = checked.map(() => event.target.checked);

    processSelectStatus(updatedChecked);
  };

  const statusesFullInfo = getStatusesFullObject(checked, handleChange);

  const children = (
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
                      bgcolor: "#ffffff",
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

  const isAllChecked = !!checked && checked.every(value => value);
  const isSomeChecked = checked.some(value => value);

  return (
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
  );
};

StatusCheckboxGroup.propTypes = {};

export { StatusCheckboxGroup };
