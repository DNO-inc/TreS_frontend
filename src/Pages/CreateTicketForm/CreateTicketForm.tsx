import { Grid, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { QueueSelect } from "./components/QueueSelect";
import { TicketTitleInput } from "./components/TicketTitleInput";
import { TicketBodyTextField } from "./components/TicketBodyTextField";
import { FormActions } from "./components/FormActions";
import { useForm } from "react-hook-form";
import { useTheme } from "@emotion/react";
import { TicketVisibilityOptions } from "./components/TicketVisibilityOptions";
import { useGetProfileQuery } from "../../store/api/profile/profile.api";
import { useEffect, useState } from "react";
import { useCreateTicketMutation } from "../../store/api/tickets/tickets.api";

const CreateTicketForm = () => {
  const { t } = useTranslation();
  const { palette }: IPalette = useTheme();
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [queue, setQueue] = useState("none");

  const { data, isSuccess } = useGetProfileQuery({ userId: null });
  const [createTicket] = useCreateTicketMutation();

  const {
    register,
    handleSubmit,
    setValue,
    resetField,
    formState: { errors },
  } = useForm();

  const handleClear = () => {
    resetField("subject");
    resetField("body");
    setQueue("none");
    setSelectedOptions([]);
  };

  const onSubmit = data => {
    createTicket({ body: JSON.stringify(data) });
    handleClear();
  };

  useEffect(() => {
    isSuccess && setValue("faculty", data.faculty);
  }, [isSuccess, data?.faculty, setValue]);

  return (
    <Grid container>
      <Typography variant="h1">{t("createTicket.heading")}</Typography>
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
              faculty={isSuccess ? data.faculty : ""}
              register={register}
              setValue={setValue}
              queue={queue}
              setQueue={setQueue}
            />
            <TicketTitleInput errors={errors} register={register} />
            <TicketBodyTextField register={register} />
            <TicketVisibilityOptions
              setValue={setValue}
              selectedOptions={selectedOptions}
              setSelectedOptions={setSelectedOptions}
            />
            <FormActions handleClear={handleClear} />
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
};

CreateTicketForm.propTypes = {};

export { CreateTicketForm };
