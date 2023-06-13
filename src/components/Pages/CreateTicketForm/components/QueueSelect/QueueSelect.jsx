import { useEffect, useState } from "react";
import { useTheme } from "@emotion/react";
import {
  Box,
  FormControl,
  ListItemText,
  ListSubheader,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useGetQueueBuFacultyMutation } from "../../../../../store/api/api";
import { Loader } from "../../../../Loader";

const QueueSelect = ({ faculty, register, setValue, queue, setQueue }) => {
  const { t } = useTranslation();
  const { palette } = useTheme();
  const [sortedQueues, setSortedQueues] = useState([]);

  const [getQueues, { data, isSuccess, isLoading }] =
    useGetQueueBuFacultyMutation();

  const handleChange = event => {
    const selectedQueue = event.target.value;
    setQueue(selectedQueue);
    setValue("queue", selectedQueue);
  };

  useEffect(() => {
    faculty && getQueues({ body: JSON.stringify({ faculty: faculty }) });
  }, [faculty]);

  useEffect(() => {
    if (isSuccess) {
      const newSortedQueues = [...data.queues_list].sort((a, b) =>
        a.scope.localeCompare(b.scope)
      );

      setSortedQueues(newSortedQueues);
    }
  }, [isSuccess]);

  useEffect(() => {
    setValue("queue", null);
  }, []);

  const menuItems = [];
  let currentScope = null;

  if (sortedQueues) {
    for (let i = 0; i < sortedQueues.length; i++) {
      const item = sortedQueues[i];
      const isFirstItemWithScope = item.scope !== currentScope;

      if (isFirstItemWithScope) {
        currentScope = item.scope;
        menuItems.push(
          <ListSubheader key={`subheader-${currentScope}`}>
            {currentScope}
          </ListSubheader>
        );
      }

      menuItems.push(
        <MenuItem
          value={item.queue_id}
          key={`menuItem-${item.queue_id}`}
          name={item.name}
        >
          <ListItemText primary={item.name} />
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
          value={queue}
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
