import { FC, memo } from "react";
import { useTranslation } from "react-i18next";
import { UseFormSetValue } from "react-hook-form";

import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import Typography from "@mui/material/Typography";

import { useStyles } from "./styles/useStyles";
import { VisibilityCheckbox } from "./components/VisibilityCheckbox";

interface TicketVisibilityOptionsProps {
  setValue: UseFormSetValue<ICreateTicketRequestBody>;
  anonymous: boolean;
  hidden: boolean;
}

const TicketVisibilityOptions: FC<TicketVisibilityOptionsProps> = memo(
  ({ setValue, anonymous, hidden }) => {
    const { t } = useTranslation();

    const [formControlStyles] = useStyles();

    return (
      <Box sx={{ width: "100%" }}>
        <Typography variant="h3">{t("createTicket.ticketOptions")}</Typography>
        <FormControl sx={{ width: "100%" }}>
          <FormGroup sx={formControlStyles}>
            <VisibilityCheckbox
              option={anonymous}
              setValue={setValue}
              type={"anonymous"}
            />
            <VisibilityCheckbox
              option={hidden}
              setValue={setValue}
              type={"hidden"}
            />
          </FormGroup>
        </FormControl>
      </Box>
    );
  }
);

export { TicketVisibilityOptions };
