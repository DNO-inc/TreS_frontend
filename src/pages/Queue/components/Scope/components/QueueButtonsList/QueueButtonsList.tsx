import {
  ChangeEvent,
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useRef,
  useState,
  WheelEvent,
} from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";

import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useTheme } from "@mui/material";

import { useGetQueuesFullObject, useGetQueuesName } from "./getQueues";
import IPalette from "../../../../../../theme/IPalette.interface";

interface IQueue {
  queue_id: number;
  faculty: number;
  name: string;
  scope: string;
}
interface QueueButtonsListProps {
  queues: IQueue[];
  setQueues: Dispatch<SetStateAction<number[]>>;
  facultyId: number;
}

const QueueButtonsList: FC<QueueButtonsListProps> = ({
  queues,
  setQueues,
  facultyId,
}) => {
  const containerRef = useRef<HTMLInputElement | null>(null);
  const { t } = useTranslation();
  const { palette }: IPalette = useTheme();

  const [searchParams, setSearchParams] = useSearchParams();

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
        return false;
      });

  const [checked, setChecked] = useState(checkedFromUrl);

  const setQueuesParams = (updatedChecked: boolean[], isAllQueues = false) => {
    const params = new URLSearchParams(searchParams.toString());

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

      if (params.has(scope)) {
        params.set(scope, queueSortedList);
      } else {
        params.append(scope, queueSortedList);
      }
    }

    setSearchParams(params);
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

  useEffect(() => {
    setChecked(
      queuesName.map(() => {
        return false;
      })
    );
  }, [facultyId]);

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

  const handleWheelScroll = (event: WheelEvent<HTMLInputElement>) => {
    const container = containerRef.current;
    if (container) {
      container.scrollLeft -= event.deltaY;
    }
  };

  return (
    <Box
      ref={containerRef}
      onWheel={handleWheelScroll}
      sx={{
        display: "flex",
        alignItems: "center",
        overflowX: "auto",
        pb: 1,
        "&::-webkit-scrollbar": {
          height: "6px",
        },
        "&::-webkit-scrollbar-thumb": {
          background: palette.grey.divider,
          borderRadius: "4px",
        },
        "&::-webkit-scrollbar-thumb:hover": {
          background: "#555",
        },
        "& > .MuiFormControlLabel-root, & > .MuiBox-root > .MuiFormControlLabel-root":
          {
            fontSize: 14,
            p: "12px 20px",
            m: 0,
            borderRadius: 1,
            whiteSpace: "nowrap",
            "& > .MuiCheckbox-root": {
              display: "none",
            },
            "&:hover": {
              transitionDuration: "0.3s",
              filter: "brightness(80%)",
            },
          },
      }}
    >
      <FormControlLabel
        label={t("queue.showAll")}
        sx={{
          bgcolor: isAllChecked ? palette.semantic.info : palette.grey.button,
        }}
        control={
          <Checkbox checked={isAllChecked} onChange={handleParentChange} />
        }
      />
      {children}
    </Box>
  );
};

export { QueueButtonsList };
