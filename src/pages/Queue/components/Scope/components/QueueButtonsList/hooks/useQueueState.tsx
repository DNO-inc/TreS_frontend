import { useEffect, useState, ChangeEvent } from "react";
import { useSearchParams } from "react-router-dom";

import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import useTheme from "@mui/material/styles/useTheme";

import { useGetQueuesFullObject, useGetQueuesName } from "./getQueues";
import { useChangeURL } from "../../../../../../../shared/hooks";
import IPalette from "../../../../../../../theme/IPalette.interface";

interface IQueue {
  queue_id: number;
  faculty: number;
  name: string;
  scope: string;
}

interface IUseQueueState {
  children: JSX.Element;
  handleParentChange: (event: ChangeEvent<HTMLInputElement>) => void;
  isAllChecked: boolean;
}

const useQueueState = (
  queues: IQueue[],
  setQueues: React.Dispatch<React.SetStateAction<number[]>>
): IUseQueueState => {
  const { palette }: IPalette = useTheme();
  const [searchParams] = useSearchParams();

  const scope = queues[0].scope;
  const queuesName: string[] = useGetQueuesName(queues);

  const searchParamsOrder = searchParams.get(scope);
  const queuesOrder: number[] = searchParamsOrder
    ? searchParamsOrder.split(",").map(item => Number(item))
    : [];
  const checkedFromUrl = queuesOrder.length
    ? queuesName.map((_, index) => {
        return queuesOrder.includes(index);
      })
    : queuesName.map(() => {
        return true;
      });

  const [checked, setChecked] = useState<boolean[]>(checkedFromUrl);

  const putQueuesInURL = useChangeURL();
  const params = new URLSearchParams(searchParams.toString());

  const setQueuesParams = (updatedChecked: boolean[], isAllQueues = false) => {
    if (isAllQueues) {
      params.delete(scope);
    } else {
      const queueSortedList = updatedChecked
        .reduce((indices: number[], boolean: boolean, index: number) => {
          if (boolean) {
            indices.push(index);
          }
          return indices;
        }, [])
        .join(",");

      putQueuesInURL(scope, queueSortedList);
    }
  };

  const handleChange =
    (index: number) =>
    (event: ChangeEvent<HTMLInputElement>): void => {
      const updatedChecked = [...checked];
      updatedChecked[index] = event.target.checked;

      setChecked(updatedChecked);

      setQueuesParams(updatedChecked);
    };

  const handleParentChange = (event: ChangeEvent<HTMLInputElement>) => {
    const updatedChecked = checked.map(() => event.target.checked);

    setChecked(updatedChecked);

    setQueuesParams(updatedChecked, true);
  };

  const queuesFullInfo = useGetQueuesFullObject(queues, checked, handleChange);

  useEffect(() => {
    const filteredQueues = queuesFullInfo.filter(queue => queue.checked);

    setQueues(filteredQueues.map(queue => queue.queue_id));
  }, [checked]);

  const children: JSX.Element = (
    <Box sx={{ display: "flex", gap: 1.5, ml: 2 }}>
      {queuesFullInfo.map(queue => {
        return (
          <FormControlLabel
            label={queue.name}
            sx={{
              bgcolor: queue.checked
                ? palette.semantic.info
                : palette.grey.button,
            }}
            control={
              <Box sx={{ position: "relative" }}>
                <Checkbox
                  checked={queue.checked}
                  onChange={queue.onChange}
                  sx={{
                    display: "none",
                  }}
                />
              </Box>
            }
            key={queue.queue_id}
          />
        );
      })}
    </Box>
  );

  const isAllChecked: boolean =
    !!checked.length && checked.every(value => value);

  return {
    children,
    handleParentChange,
    isAllChecked,
  };
};

export { useQueueState };
