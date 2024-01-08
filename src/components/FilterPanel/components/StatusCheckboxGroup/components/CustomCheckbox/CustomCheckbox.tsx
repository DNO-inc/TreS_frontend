import { FC } from "react";

import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

import { IStatusFullObject } from "../../getStatuses";

interface CustomCheckboxProps {
  status: IStatusFullObject;
}

const CustomCheckbox: FC<CustomCheckboxProps> = ({ status }) => {
  return (
    <FormControlLabel
      label={status.name}
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
                bgcolor: status.color === "#FFFFFF" ? "#000000" : "#ffffff",
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
