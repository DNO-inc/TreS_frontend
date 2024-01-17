import { Dispatch, FC, SetStateAction, useRef, WheelEvent } from "react";
import { useTranslation } from "react-i18next";

import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import useTheme from "@mui/material/styles/useTheme";

import IPalette from "../../../../../../theme/IPalette.interface";
import { useQueueState } from "./hooks/useQueueState";

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

  const { children, handleParentChange, isAllChecked } = useQueueState(
    queues,
    setQueues,
    facultyId
  );

  const handleWheelScroll = (event: WheelEvent<HTMLInputElement>) => {
    const container = containerRef.current;
    if (container) {
      container.scrollLeft += event.deltaY;
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
        "&": {
          scrollbarWidth: "thin",
          scrollbarColor: "#555 #212125",
        },
        "&:hover": {
          scrollbarColor: "#555 #212125",
        },
        "& > .MuiFormControlLabel-root, & > .MuiBox-root > .MuiFormControlLabel-root":
          {
            fontSize: 14,
            p: "8px 16px",
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
          bgcolor: isAllChecked ? "none" : palette.grey.button,
        }}
        control={
          <Checkbox
            checked={isAllChecked}
            disabled={isAllChecked}
            onChange={handleParentChange}
          />
        }
      />
      {children}
    </Box>
  );
};

export { QueueButtonsList };
