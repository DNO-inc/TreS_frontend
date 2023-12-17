import { useEffect, useState, FC } from "react";
import { useTranslation } from "react-i18next";
import { UseFormRegister, UseFormSetValue } from "react-hook-form";

import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import { SelectChangeEvent } from "@mui/material/Select";
import useTheme from "@mui/material/styles/useTheme";

import { Loader } from "../../../../components/Loader";

import { useGetQueueByFacultyMutation } from "../../../../store/api/api";
import IPalette from "../../../../theme/IPalette.interface";

interface QueueSelectProps {
  facultyId: number | null;
  queue: number | "none";
  register: UseFormRegister<ICreateTicketRequestBody>;
  setValue: UseFormSetValue<ICreateTicketRequestBody>;
  setQueue: (queue: number) => void;
}

const QueueSelect: FC<QueueSelectProps> = ({
  facultyId,
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
    facultyId && getQueues({ body: JSON.stringify({ faculty: facultyId }) });
  }, [facultyId, getQueues]);

  useEffect(() => {
    if (isSuccess) {
      const newSortedQueues: IQueueData[] = [...data.queues_list].sort((a, b) =>
        a.scope.localeCompare(b.scope)
      );

      setSortedQueues(newSortedQueues);

      newSortedQueues.forEach(queue => {
        if (queue.name === "Інше" && queue.scope === "Reports") {
          setQueue(queue.queue_id);
          setValue("queue", queue.queue_id);
        }
      });
    }
  }, [isSuccess, data?.queues_list]);

  useEffect(() => {
    setValue("queue", null);
  }, []);

  const menuItems: JSX.Element[] = [];
  let currentScope: string | null = null;

  if (sortedQueues) {
    for (let i = 0; i < sortedQueues.length; i++) {
      const queue = sortedQueues[i];
      const isFirstItemWithScope = queue.scope !== currentScope;
      //Refactor this
      let isSelected = false;

      if (isFirstItemWithScope) {
        currentScope = queue.scope;

        menuItems.push(
          <ListSubheader key={`subheader-${currentScope}`}>
            {t(`common.${currentScope.toLowerCase()}`)}
          </ListSubheader>
        );
      }

      menuItems.push(
        <MenuItem
          value={queue.queue_id}
          selected={isSelected}
          key={`menuItem-${queue.queue_id}`}
        >
          <ListItemText primary={queue.name} />
        </MenuItem>
      );
    }
  }

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
        {...register("queue")}
      >
        {isLoading && <Loader size="small" />}
        {isSuccess && (
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
};

export { QueueSelect };
