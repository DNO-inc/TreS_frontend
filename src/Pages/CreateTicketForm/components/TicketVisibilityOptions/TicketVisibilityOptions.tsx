import { useEffect } from "react";
import { useTheme } from "@emotion/react";
import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";

const TicketVisibilityOptions = ({
  setValue,
  selectedOptions,
  setSelectedOptions,
}) => {
  const { t } = useTranslation();
  const { palette } = useTheme();

  const handleClick = event => {
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
  }, [selectedOptions]);

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
              bgcolor:
                selectedOptions.includes("anonymous") && palette.grey.divider,
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
              bgcolor:
                selectedOptions.includes("hidden") && palette.grey.divider,
            }}
          />
        </FormGroup>
      </FormControl>
    </Box>
  );
};

TicketVisibilityOptions.propTypes = {};

export { TicketVisibilityOptions };
