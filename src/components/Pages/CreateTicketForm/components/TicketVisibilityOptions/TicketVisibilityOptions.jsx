import { useEffect, useState } from "react";
import { useTheme } from "@emotion/react";
import {
  Box,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";

const TicketVisibilityOptions = ({ setValue, option, setOption }) => {
  const { t } = useTranslation();
  const { palette } = useTheme();

  const handleClick = event => {
    const selectedOption = event.target.value;

    if (selectedOption) {
      if (option === selectedOption) {
        setValue(selectedOption, false);
        setOption("");
      } else {
        setValue(selectedOption, true);
        setValue(option === "hidden" ? "hidden" : "anonymous", false);
        setOption(selectedOption);
      }
    }
  };

  useEffect(() => {
    setValue("hidden", false);
    setValue("anonymous", false);
  }, []);

  return (
    <Box>
      <Typography variant="h3">Ticket options</Typography>
      <FormControl sx={{ width: "100%" }}>
        <RadioGroup
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={option}
          onClick={handleClick}
          sx={{
            display: "flex",
            gap: 3,
            "& > div": {
              position: "relative",
              cursor: "pointer",
              mr: 0,
              "& > label": {
                border: `2px solid ${palette.grey.divider}`,
                m: 0,
                p: "16px 16px 44px 8px",
                width: "100%",
                "& > .MuiRadio-root": {
                  color: palette.common.white,
                },
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
          <Box>
            <FormControlLabel
              value="hidden"
              control={<Radio size="small" />}
              label="Become anonymous"
              sx={{ bgcolor: option === "hidden" && palette.grey.divider }}
            />
            <Typography>
              Your{" "}
              <span style={{ color: palette.semantic.info }}>
                name will be hidden
              </span>{" "}
              in general reports only
            </Typography>
          </Box>
          <Box>
            <FormControlLabel
              value="anonymous"
              control={<Radio size="small" />}
              label="Private report"
              sx={{ bgcolor: option === "anonymous" && palette.grey.divider }}
            />
            <Typography>
              Your{" "}
              <span style={{ color: palette.semantic.error }}>
                ticket will not be shown
              </span>{" "}
              in general reports
            </Typography>
          </Box>
        </RadioGroup>
      </FormControl>
    </Box>
  );
};

TicketVisibilityOptions.propTypes = {};

export { TicketVisibilityOptions };
