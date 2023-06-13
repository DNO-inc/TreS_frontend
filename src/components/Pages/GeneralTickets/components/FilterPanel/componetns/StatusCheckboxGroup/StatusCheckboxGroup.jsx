import { useState } from "react";
import { Box, Checkbox, FormControlLabel } from "@mui/material";
import { VerticalDivider } from "../../../../../../VerticalDivider";
import { useLocation, useNavigate } from "react-router-dom";
import { useCustomNavigate } from "../../../../../../../shared/hooks";
import { useTranslation } from "react-i18next";

const StatusCheckboxGroup = ({ setRequestBody }) => {
  const { t } = useTranslation();
  const { pathname, search } = useLocation();
  const [checked, setChecked] = useState([true, true, true, true, true, true]);
  const navigate = useNavigate();

  // useEffect(() => {
  //   const searchParams = new URLSearchParams(location.search);
  //   const statusesUrl = searchParams.get("statuses");

  //   if (statusesUrl) {
  //     const selectedStatuses = statusesUrl.split(",");
  //     const updatedChecked = statuses.map(statusObj => {
  //       const matchingStatus = selectedStatuses.includes(statusObj.label);
  //       return matchingStatus;
  //     });

  //     setChecked(updatedChecked);
  //   }
  // }, [location.search]);

  const handleChange = index => event => {
    const updatedChecked = [...checked];
    updatedChecked[index] = event.target.checked;
    setChecked(updatedChecked);

    const selectedStatuses = statuses
      .filter(status => updatedChecked[status.id])
      .map(status => status.label);

    setRequestBody(prevBody => ({ ...prevBody, status: selectedStatuses }));

    const params = `statuses=${selectedStatuses.join(",")}`;
    navigate(pathname + !search.length ? `?${params}` : `${search}&${params}`);
  };

  const handleParentChange = event => {
    const updatedChecked = checked.map(() => event.target.checked);
    setChecked(updatedChecked);

    const selectedStatuses = statuses
      .filter(status => updatedChecked[status.id])
      .map(status => status.label);

    setRequestBody(prevBody => ({ ...prevBody, status: selectedStatuses }));

    const params = `statuses=${selectedStatuses.join(",")}`;
    useCustomNavigate(params);
  };

  const statuses = [
    // {
    //   id: 0,
    //   label: t("statusesFilter.new"),
    //   color: "#888888",
    //   checked: checked[0],
    //   onChange: handleChange(0),
    // },
    {
      id: 1,
      label: t("statusesFilter.accepted"),
      color: "#E09C36",
      checked: checked[1],
      onChange: handleChange(1),
    },
    {
      id: 2,
      label: t("statusesFilter.open"),
      color: "#2982D3",
      checked: checked[2],
      onChange: handleChange(2),
    },
    {
      id: 3,
      label: t("statusesFilter.waiting"),
      color: "#9E3DFF",
      checked: checked[3],
      onChange: handleChange(3),
    },
    // {
    //   id: 4,
    //   label: t("statusesFilter.rejected"),
    //   color: "#D94B44",
    //   checked: checked[4],
    //   onChange: handleChange(4),
    // },
    {
      id: 5,
      label: t("statusesFilter.close"),
      color: "#68B651",
      checked: checked[5],
      onChange: handleChange(5),
    },
  ];

  const children = (
    <Box sx={{ display: "flex", flexWrap: "wrap", ml: 2 }}>
      {statuses.map(status => {
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

  const isAllChecked = checked.every(value => value);
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
