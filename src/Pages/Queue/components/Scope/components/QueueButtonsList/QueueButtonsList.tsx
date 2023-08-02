import { ChangeEvent, FC, useRef, useState, WheelEvent } from "react";

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
}

const QueueButtonsList: FC<QueueButtonsListProps> = ({ queues }) => {
  const containerRef = useRef<HTMLInputElement | null>(null);
  const { palette }: IPalette = useTheme();

  const queuesName: string[] = useGetQueuesName(queues);

  const [checked, setChecked] = useState(queuesName.map(() => true));

  const handleChange =
    (index: number) =>
    (event: ChangeEvent<HTMLInputElement>): void => {
      const updatedChecked = [...checked];
      updatedChecked[index] = event.target.checked;

      setChecked(updatedChecked);
    };

  const handleParentChange = (event: ChangeEvent<HTMLInputElement>) => {
    const updatedChecked = checked.map(() => event.target.checked);

    setChecked(updatedChecked);
  };

  const queuesFullInfo = useGetQueuesFullObject(queues, checked, handleChange);

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

  const isAllChecked: boolean = !!checked && checked.every(value => value);

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
        label={"Show all"}
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
