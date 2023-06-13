import { Grid, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { QueueSelect } from "./components/QueueSelect";
import { TicketTitleInput } from "./components/TicketTitleInput";
import { TicketBodyTextField } from "./components/TicketBodyTextField";
import { FormActions } from "./components/FormActions";
import { useForm } from "react-hook-form";
import { useTheme } from "@emotion/react";
import { TicketVisibilityOptions } from "./components/TicketVisibilityOptions";
import { useGetProfileQuery } from "../../../store/api/profile/profile.api";
import { useEffect, useState } from "react";
import { useCreateTicketMutation } from "../../../store/api/tickets/tickets.api";

const CreateTicketForm = () => {
  const { t } = useTranslation();
  const { palette } = useTheme();
  const [option, setOption] = useState("");
  const [queue, setQueue] = useState("none");

  const { data, isSuccess } = useGetProfileQuery({ userId: null });
  const [createTicket] = useCreateTicketMutation();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = data => {
    createTicket({ body: JSON.stringify(data) });
    reset();
  };

  useEffect(() => {
    isSuccess && setValue("faculty", data.faculty);
  }, [isSuccess]);

  return (
    <Grid container>
      <Grid item>
        <Typography variant="h1">{t("createTicket.heading")}</Typography>
      </Grid>
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
                border: `2px solid ${palette.grey.divider}`,
              },
              "& > div > div > .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                {
                  borderColor: palette.primary.main,
                },
            }}
          >
            <QueueSelect
              faculty={isSuccess && data.faculty}
              register={register}
              setValue={setValue}
              queue={queue}
              setQueue={setQueue}
            />
            <TicketTitleInput errors={errors} register={register} />
            <TicketBodyTextField register={register} />
            <TicketVisibilityOptions
              setValue={setValue}
              option={option}
              setOption={setOption}
            />
            <FormActions
              reset={reset}
              setQueue={setQueue}
              setOption={setOption}
            />
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
};

CreateTicketForm.propTypes = {};

export { CreateTicketForm };
