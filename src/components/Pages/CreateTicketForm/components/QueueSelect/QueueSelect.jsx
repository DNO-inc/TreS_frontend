import { useEffect, useState } from "react";
import { useTheme } from "@emotion/react";
import {
  Box,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  Radio,
  Select,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useGetQueueBuFacultyMutation } from "../../../../../store/api/api";
import { Loader } from "../../../../Loader";

const QueueSelect = ({ faculty, register, setValue }) => {
  const { t } = useTranslation();
  const { palette } = useTheme();
  const [queue, setQueue] = useState("none");
  const [getQueues, { data, isSuccess, isLoading }] =
    useGetQueueBuFacultyMutation();

  const handleChange = event => {
    const selectedQueue = event.target.value;
    setQueue(selectedQueue);
    setValue("queue", selectedQueue);
  };

  useEffect(() => {
    getQueues({ body: JSON.stringify({ faculty: faculty }) });
  }, [faculty]);

  useEffect(() => {
    setValue("queue", null);
  }, []);

  return (
    <Box>
      <Typography variant="h3">Queue</Typography>
      <FormControl
        fullWidth
        sx={{ bgcolor: palette.grey.card }}
        {...register("queue")}
      >
        <Select id="queue-select" value={queue} onChange={handleChange}>
          <MenuItem value="none" disabled>
            <ListItemText
              primary="Select queue"
              primaryTypographyProps={{
                style: { color: palette.whiteAlpha[600] },
              }}
            />
          </MenuItem>
          {isLoading && <Loader />}
          {isSuccess &&
            data.queues_list.map(item => {
              return (
                <MenuItem value={item.name} key={item.queue_id}>
                  {item.name}
                </MenuItem>
              );
            })}
        </Select>
      </FormControl>
    </Box>
  );
};

QueueSelect.propTypes = {};

export { QueueSelect };
