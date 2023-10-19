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
    <Box sx={{ width: "100%" }}>
      <Typography variant="h3">{t("createTicket.ticketOptions")}</Typography>
      <FormControl sx={{ width: "100%" }}>
        <FormGroup
          sx={{
            flexDirection: "row",
            gap: 3,
            "& > label": {
              display: "inline-block",
              position: "relative",
              cursor: "pointer",
              borderRadius: 1,
              border: `3px solid ${palette.grey.divider}`,
              m: 0,
              p: "16px 16px 16px 8px",
              width: { xs: "100%", md: "calc(100% / 2 - 12px)" },
              "& > .MuiCheckbox-root": {
                position: "absolute",
                top: 40,
                left: 0,
                color: palette.common.white,
              },
              "& > .MuiButtonBase-root": {
                mt: -4,
              },
            },
          }}
        >
          <FormControlLabel
            control={
              <Checkbox
                size="small"
                checked={selectedOptions.includes("anonymous")}
                value="anonymous"
                onChange={handleClick}
              />
            }
            label={
              <Box sx={{ ml: 4 }}>
                {t("createTicket.anonymousTitle")}
                <Typography
                  sx={{ ml: 2, mt: 1, color: palette.whiteAlpha.default }}
                >
                  {t("createTicket.anonymousPart1")}{" "}
                  <span style={{ color: palette.semantic.info }}>
                    {t("createTicket.anonymousPart2")}
                  </span>{" "}
                  {t("createTicket.anonymousPart3")}
                </Typography>
              </Box>
            }
            sx={{
              bgcolor: selectedOptions.includes("anonymous")
                ? palette.grey.divider
                : "",
            }}
          />
          <FormControlLabel
            control={
              <Checkbox
                size="small"
                checked={selectedOptions.includes("hidden")}
                value="hidden"
                onChange={handleClick}
              />
            }
            label={
              <Box sx={{ ml: 4 }}>
                {t("createTicket.hiddenTitle")}
                <Typography
                  sx={{ ml: 2, mt: 1, color: palette.whiteAlpha.default }}
                >
                  {t("createTicket.hiddenPart1")}{" "}
                  <span style={{ color: palette.semantic.error }}>
                    {t("createTicket.hiddenPart2")}
                  </span>{" "}
                  {t("createTicket.hiddenPart3")}
                </Typography>
              </Box>
            }
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
