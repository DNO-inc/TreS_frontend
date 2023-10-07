import { useState, FC } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { SerializedError } from "@reduxjs/toolkit";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import useTheme from "@mui/material/styles/useTheme";

import { FacultySelect } from "./components/FacultySelect";
import { QueueSelect } from "./components/QueueSelect";
import { TicketTitleInput } from "./components/TicketTitleInput";
import { TicketBodyTextField } from "./components/TicketBodyTextField";
import { FormActions } from "./components/FormActions";
import { TicketVisibilityOptions } from "./components/TicketVisibilityOptions";

import { useCreateTicketMutation } from "../../store/api/tickets/tickets.api";
import IPalette from "../../theme/IPalette.interface";
import { getUserFacultyId } from "../../shared/functions/getLocalStorageData";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { SerializedError } from "@reduxjs/toolkit";

type ApiResponse = {
  data?: {
    ticket_id: number;
  };
  error?: FetchBaseQueryError | SerializedError;
};

type ApiResponse = {
  data?: {
    ticket_id: number;
  };
  error?: FetchBaseQueryError | SerializedError;
};

const CreateTicketForm: FC = () => {
  const { t } = useTranslation();
  const { palette }: IPalette = useTheme();

  const facultyId = getUserFacultyId();

  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [queue, setQueue] = useState<number>(-1);
  const [faculty, setFaculty] = useState<number>(facultyId);
  const [formattedText, setFormattedText] = useState("");
  const [ticketId, setTicketId] = useState<number | null>(null);

  const [createTicket] = useCreateTicketMutation();

  const {
    register,
    handleSubmit,
    setValue,
    resetField,
    // formState: { errors },
  } = useForm<ICreateTicketRequestBody>();

  const handleClear = (): void => {
    resetField("subject");
    setValue("queue", null);
    setFormattedText("");
    setQueue(-1);
    setSelectedOptions([]);
  };

  const onSubmit = (data: ICreateTicketRequestBody): void => {
    createTicket({ body: JSON.stringify(data) }).then(
      (response: ApiResponse) => {
        if (response && response?.data && response?.data?.ticket_id) {
          setTicketId(response?.data?.ticket_id);
        }
      }
    );
    handleClear();
  };

  return (
    <Grid container sx={{ pb: 3 }}>
      <Typography variant="h1" sx={{ pt: 3.5, pb: 3.5 }}>
        {t("createTicket.heading")}
      </Typography>
      <Grid container>
        <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
          <Grid
            container
            sx={{
              gap: 3,
              "& > .MuiBox-root": {
                width: "100%",
              },
              "& > div > h3": {
                mb: 1,
              },
              "& > div > div > div > fieldset": {
                border: `3px solid ${palette.grey.divider}`,
              },
              "& > div > div > .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                {
                  borderColor: palette.primary.main,
                },
            }}
          >
            <FacultySelect
              facultyId={facultyId}
              register={register}
              setValue={setValue}
              faculty={faculty}
              setFaculty={setFaculty}
            />
            <QueueSelect
              facultyId={faculty}
              register={register}
              setValue={setValue}
              queue={queue}
              setQueue={setQueue}
            />
            <TicketTitleInput register={register} />
            <TicketBodyTextField
              register={register}
              formattedText={formattedText}
              setFormattedText={setFormattedText}
            />
            <TicketVisibilityOptions
              setValue={setValue}
              selectedOptions={selectedOptions}
              setSelectedOptions={setSelectedOptions}
            />
            <FormActions handleClear={handleClear} ticketId={ticketId} />
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
};

export { CreateTicketForm };
