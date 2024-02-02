import { FC } from "react";
import { useTranslation } from "react-i18next";

import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import useTheme from "@mui/material/styles/useTheme";

import { IStatus } from "../../hooks/useGetStatusesFullInfo";
import IPalette from "theme/IPalette.interface";

interface CustomCheckboxProps {
  status: IStatus;
}

const CustomCheckbox: FC<CustomCheckboxProps> = ({ status }) => {
  const { t } = useTranslation();
  const { palette }: IPalette = useTheme();

  return (
    <FormControlLabel
      label={t(`statusesFilter.${status.name}`)}
      control={
        <Box sx={{ position: "relative" }}>
          <Checkbox
            color="default"
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
                  status.color === "#FFFFFF"
                    ? palette.common.black
                    : palette.common.white,
                transform: "translate(-50%, -50%)",
              }}
            ></Box>
          )}
        </Box>
      }
      key={status.id}
    />
  );
};

export { CustomCheckbox };
