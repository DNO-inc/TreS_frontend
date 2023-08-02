import { useEffect, FC, Dispatch, SetStateAction, ChangeEvent } from "react";
import { useTranslation } from "react-i18next";
import { UseFormSetValue } from "react-hook-form";

import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Typography from "@mui/material/Typography";
import useTheme from "@mui/material/styles/useTheme";

import IPalette from "../../../../theme/IPalette.interface";

interface TicketVisibilityOptionsProps {
  selectedOptions: string[];
  setValue: UseFormSetValue<ICreateTicketRequestBody>;
  setSelectedOptions: Dispatch<SetStateAction<string[]>>;
}

const TicketVisibilityOptions: FC<TicketVisibilityOptionsProps> = ({
  setValue,
  selectedOptions,
  setSelectedOptions,
}) => {
  const { t } = useTranslation();
  const { palette }: IPalette = useTheme();

  const handleClick = (event: ChangeEvent<HTMLInputElement>): void => {
    const selectedOption = event.target.value;

    if (selectedOptions.includes(selectedOption)) {
      setSelectedOptions(
        selectedOptions.filter(option => option !== selectedOption)
      );
    } else {
      setSelectedOptions([...selectedOptions, selectedOption]);
    }
  };

  useEffect(() => {
    setValue("hidden", selectedOptions.includes("hidden"));
    setValue("anonymous", selectedOptions.includes("anonymous"));
  }, [selectedOptions, setValue]);

  return (
    <Box>
      <Typography variant="h3">{t("createTicket.ticketOptions")}</Typography>
      <FormControl sx={{ width: "100%" }}>
        <FormGroup
          sx={{
            display: "flex",
            gap: 3,

            "& > label": {
              position: "relative",
              cursor: "pointer",
              border: `2px solid ${palette.grey.divider}`,
              m: 0,
              p: "16px 16px 44px 8px",
              width: "100%",
              "& > .MuiCheckbox-root": {
                color: palette.common.white,
              },
              "& > p": {
                color: "rgba(255, 255, 255, 0.48);",
                position: "absolute",
                left: 52,
                top: 52,
              },
            },
          }}
        >
          <FormControlLabel
            control={
              <>
                <Checkbox
                  size="small"
                  checked={selectedOptions.includes("anonymous")}
                  value="anonymous"
                  onChange={handleClick}
                />
                <Typography>
                  {t("createTicket.anonymousPart1")}{" "}
                  <span style={{ color: palette.semantic.info }}>
                    {t("createTicket.anonymousPart2")}
                  </span>{" "}
                  {t("createTicket.anonymousPart3")}
                </Typography>
              </>
            }
            label={t("createTicket.anonymousTitle")}
            sx={{
              bgcolor: selectedOptions.includes("anonymous")
                ? palette.grey.divider
                : "",
            }}
          />
          <FormControlLabel
            control={
              <>
                <Checkbox
                  size="small"
                  checked={selectedOptions.includes("hidden")}
                  value="hidden"
                  onChange={handleClick}
                />
                <Typography>
                  {t("createTicket.hiddenPart1")}{" "}
                  <span style={{ color: palette.semantic.error }}>
                    {t("createTicket.hiddenPart2")}
                  </span>{" "}
                  {t("createTicket.hiddenPart3")}
                </Typography>
              </>
            }
            label={t("createTicket.hiddenTitle")}
            sx={{
              bgcolor: selectedOptions.includes("hidden")
                ? palette.grey.divider
                : "",
            }}
          />
        </FormGroup>
      </FormControl>
    </Box>
  );
};

export { TicketVisibilityOptions };
