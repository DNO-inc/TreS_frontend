import { ChangeEvent, FC } from "react";
import { useTranslation } from "react-i18next";
import { UseFormSetValue } from "react-hook-form";

import FormControlLabel from "@mui/material/FormControlLabel";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import useTheme from "@mui/material/styles/useTheme";

import IPalette from "../../../../../../theme/IPalette.interface";

interface VisibilityCheckboxProps {
  option: boolean;
  type: "anonymous" | "hidden";
  setValue: UseFormSetValue<ICreateTicketRequestBody>;
}

const VisibilityCheckbox: FC<VisibilityCheckboxProps> = ({
  option,
  type,
  setValue,
}) => {
  const { t } = useTranslation();
  const { palette }: IPalette = useTheme();

  const handleClick = (event: ChangeEvent<HTMLInputElement>): void => {
    const selectedOption = event.target.value as "anonymous" | "hidden";

    setValue(selectedOption, !option);
  };

  const color =
    type === "anonymous" ? palette.semantic.info : palette.semantic.error;

  return (
    <FormControlLabel
      control={
        <Checkbox
          color="default"
          size="small"
          checked={option}
          value={type}
          onChange={handleClick}
        />
      }
      sx={{
        bgcolor: option ? palette.grey.divider : "",
      }}
      label={
        <Box sx={{ ml: 4 }}>
          {t(`createTicket.${type}Title`)}
          <Typography sx={{ ml: 2, mt: 1, color: palette.whiteAlpha.default }}>
            {t(`createTicket.${type}Part1`)}{" "}
            <span style={{ color }}>{t(`createTicket.${type}Part2`)}</span>{" "}
            {t(`createTicket.${type}Part3`)}
          </Typography>
        </Box>
      }
    />
  );
};

export { VisibilityCheckbox };
