import { useEffect, useState, FC } from "react";
import { useTranslation } from "react-i18next";

import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { SelectChangeEvent } from "@mui/material/Select";
import useTheme from "@mui/material/styles/useTheme";

import { Loader } from "../../../../../../components/Loader";

import { useGetQueueByFacultyMutation } from "../../../../../../store/api/api";
import IPalette from "../../../../../../theme/IPalette.interface";

interface QueueSelectProps {
  facultyId: number | null;
  queue: number;
  setQueue: (queue: number) => void;
}

const QueueSelect: FC<QueueSelectProps> = ({ facultyId, queue, setQueue }) => {
  const { t } = useTranslation();
  const { palette }: IPalette = useTheme();

  const [sortedQueues, setSortedQueues] = useState<IQueueData[]>([]);
  const [isFirstLoad, setIsFirstLoad] = useState<boolean>(true);

  const [getQueues, { data, isSuccess, isLoading }] =
    useGetQueueByFacultyMutation();

  const handleChange = (event: SelectChangeEvent): void => {
    const selectedQueue: number = parseInt(event.target.value);

    setQueue(selectedQueue);
  };

  useEffect(() => {
    facultyId && getQueues({ body: JSON.stringify({ faculty: facultyId }) });

    if (!isFirstLoad) {
      setQueue(-1);
    } else {
      setIsFirstLoad(false);
    }
  }, [facultyId]);

  useEffect(() => {
    if (isSuccess) {
      const newSortedQueues: IQueueData[] = [...data.queues_list].sort((a, b) =>
        a.scope.localeCompare(b.scope)
      );

      setSortedQueues(newSortedQueues);
    }
  }, [isSuccess, data?.queues_list]);

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
      <FormControl
        size="small"
        fullWidth
        sx={{
          bgcolor: palette.grey.card,
          minWidth: "200px",
        }}
      >
        <Select
          id="queue-select"
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
          <MenuItem value={-1} disabled>
            <ListItemText
              primary={t("createTicket.selectQueue")}
              primaryTypographyProps={{
                style: { color: palette.whiteAlpha.default },
              }}
            />
          </MenuItem>
          {isLoading && <Loader size="small" />}
          {isSuccess && menuItems}
        </Select>
      </FormControl>
    </Box>
  );
};

export { QueueSelect };
