import { useEffect, useState, FC } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";

import { Grid, Typography, useTheme } from "@mui/material";

import { QueueSelect } from "./components/QueueSelect";
import { TicketTitleInput } from "./components/TicketTitleInput";
import { TicketBodyTextField } from "./components/TicketBodyTextField";
import { FormActions } from "./components/FormActions";
import { TicketVisibilityOptions } from "./components/TicketVisibilityOptions";

import { useGetProfileQuery } from "../../store/api/profile/profile.api";
import { useCreateTicketMutation } from "../../store/api/tickets/tickets.api";
import IPalette from "../../theme/IPalette.interface";

const CreateTicketForm: FC = () => {
  const { t } = useTranslation();
  const { palette }: IPalette = useTheme();

  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [queue, setQueue] = useState<number | "none">("none");

  const { data, isSuccess } = useGetProfileQuery({ userId: null });
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
    resetField("body");
    setQueue("none");
    setSelectedOptions([]);
  };

  const onSubmit = (data: ICreateTicketRequestBody): void => {
    createTicket({ body: JSON.stringify(data) });
    handleClear();
  };

  useEffect(() => {
    isSuccess && setValue("faculty", data.faculty);
  }, [isSuccess, data?.faculty, setValue]);

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
            <TicketTitleInput register={register} />
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

export { CreateTicketForm };
