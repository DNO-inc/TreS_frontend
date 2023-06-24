import { useEffect, useState, FC } from "react";
import { useTranslation } from "react-i18next";
import { UseFormRegister, UseFormSetValue } from "react-hook-form";

import {
  Box,
  FormControl,
  ListItemText,
  ListSubheader,
  MenuItem,
  Select,
  Typography,
  useTheme,
  SelectChangeEvent,
} from "@mui/material";

import { Loader } from "../../../../components/Loader";

import { useGetQueueByFacultyMutation } from "../../../../store/api/api";
import IPalette from "../../../../theme/IPalette.interface";

interface QueueSelectProps {
  faculty: string;
  queue: number | "none";
  register: UseFormRegister<ICreateTicketRequestBody>;
  setValue: UseFormSetValue<ICreateTicketRequestBody>;
  setQueue: (queue: number) => void;
}

const QueueSelect: FC<QueueSelectProps> = ({
  faculty,
  register,
  setValue,
  queue,
  setQueue,
}) => {
  const { t } = useTranslation();
  const { palette }: IPalette = useTheme();

  const [sortedQueues, setSortedQueues] = useState<IQueueData[]>([]);

  const [getQueues, { data, isSuccess, isLoading }] =
    useGetQueueByFacultyMutation();

  const handleChange = (event: SelectChangeEvent): void => {
    const selectedQueue: number = parseInt(event.target.value);
    setQueue(selectedQueue);
    setValue("queue", selectedQueue);
  };

  useEffect(() => {
    faculty && getQueues({ body: JSON.stringify({ faculty: faculty }) });
  }, [faculty, getQueues]);

  useEffect(() => {
    if (isSuccess) {
      const newSortedQueues: IQueueData[] = [...data.queues_list].sort((a, b) =>
        a.scope.localeCompare(b.scope)
      );

      setSortedQueues(newSortedQueues);
    }
  }, [isSuccess, data?.queues_list]);

  useEffect(() => {
    setValue("queue", null);
  }, [setValue]);

  const menuItems: JSX.Element[] = [];
  let currentScope: string | null = null;

  if (sortedQueues) {
    for (let i = 0; i < sortedQueues.length; i++) {
      const queue = sortedQueues[i];

      const isFirstItemWithScope = queue.scope !== currentScope;

      if (isFirstItemWithScope) {
        currentScope = queue.scope;

        menuItems.push(
          <ListSubheader key={`subheader-${currentScope}`}>
            {currentScope}
          </ListSubheader>
        );
      }

      menuItems.push(
        <MenuItem value={queue.queue_id} key={`menuItem-${queue.queue_id}`}>
          <ListItemText primary={queue.name} />
        </MenuItem>
      );
    }
  }

  return (
    <Box>
      <Typography variant="h3">{t("createTicket.queue")}</Typography>
      <FormControl
        fullWidth
        sx={{ bgcolor: palette.grey.card }}
        {...register("queue")}
      >
        <Select
          id="queue-select"
          required
          value={queue.toString()}
          onChange={handleChange}
        >
          <MenuItem value="none" disabled>
            <ListItemText
              primary={t("createTicket.selectQueue")}
              primaryTypographyProps={{
                style: { color: palette.whiteAlpha[600] },
              }}
            />
          </MenuItem>
          {isLoading && <Loader />}
          {isSuccess && menuItems}
        </Select>
      </FormControl>
    </Box>
  );
};

export { QueueSelect };
