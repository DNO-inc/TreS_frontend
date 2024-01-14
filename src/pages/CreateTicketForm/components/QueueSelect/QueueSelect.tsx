import { useEffect, useState, FC, memo } from "react";
import { useTranslation } from "react-i18next";
import { UseFormRegister, UseFormSetValue } from "react-hook-form";

import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import useTheme from "@mui/material/styles/useTheme";

import { Loader } from "../../../../components/Loader";

import IPalette from "../../../../theme/IPalette.interface";
import { useGetQueuesByFacultyMutation } from "../../../../store/api/meta.api";
import { useGetMenuElements } from "./hooks/useGetMenuElements";
import { createFormKeys } from "../../../../constants";

interface QueueSelectProps {
  facultyId: number | null;
  queue: number | null;
  register: UseFormRegister<ICreateTicketRequestBody>;
  setValue: UseFormSetValue<ICreateTicketRequestBody>;
}

const QueueSelect: FC<QueueSelectProps> = memo(
  ({ facultyId, queue, register, setValue }) => {
    const { t } = useTranslation();
    const { palette }: IPalette = useTheme();

    const [sortedQueues, setSortedQueues] = useState<IQueueData[]>([]);

    const [getQueues, { data, isSuccess, isLoading }] =
      useGetQueuesByFacultyMutation();

    const menuItems: JSX.Element[] = useGetMenuElements(sortedQueues);

    const handleChange = (event: SelectChangeEvent): void => {
      const selectedQueue: number = parseInt(event.target.value);
      setValue(createFormKeys.QUEUE, selectedQueue);
    };

    useEffect(() => {
      facultyId && getQueues({ body: JSON.stringify({ faculty: facultyId }) });
    }, [facultyId, getQueues]);

    useEffect(() => {
      if (isSuccess) {
        const newSortedQueues: IQueueData[] = [...data.queues_list].sort(
          (a, b) => a.scope.localeCompare(b.scope)
        );

        setSortedQueues(newSortedQueues);

        newSortedQueues.forEach(queue => {
          if (queue.name === "Інше" && queue.scope === "Reports") {
            setValue(createFormKeys.QUEUE, queue.queue_id);
          }
        });
      }
    }, [isSuccess, data?.queues_list]);

    return (
      <Box
        sx={{
          width: {
            xs: "100%",
            md: "calc(100% / 2 - 12px)",
            xl: "calc(100% / 3 - 16px)",
          },
        }}
      >
        <Typography variant="h3">{t("createTicket.queue")}</Typography>
        <FormControl
          size="small"
          fullWidth
          sx={{ bgcolor: palette.grey.card }}
          {...register(createFormKeys.QUEUE)}
        >
          {isLoading && <Loader size="small" />}
          {isSuccess && queue && (
            <Select
              id="queue-select"
              required
              value={queue.toString()}
              onChange={handleChange}
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: 300,
                  },
                },
              }}
            >
              {isSuccess && menuItems}
            </Select>
          )}
        </FormControl>
      </Box>
    );
  }
);

export { QueueSelect };
