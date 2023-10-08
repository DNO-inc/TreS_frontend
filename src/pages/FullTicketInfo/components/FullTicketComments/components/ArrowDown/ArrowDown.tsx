import { Dispatch, FC, SetStateAction, MutableRefObject } from "react";

import IconButton from "@mui/material/IconButton";
import useTheme from "@mui/material/styles/useTheme";
import Badge from "@mui/material/Badge";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import IPalette from "../../../../../../theme/IPalette.interface";
import styles from "./ArrowDown.module.css";

interface ArrowDownProps {
  isVisibleArrow: boolean;
  commentFieldRef: MutableRefObject<HTMLDivElement | null>;
  setScrollHeight: Dispatch<SetStateAction<number>>;
}

const ArrowDown: FC<ArrowDownProps> = ({
  isVisibleArrow,
  commentFieldRef,
  setScrollHeight,
}) => {
  const { palette }: IPalette = useTheme();

  const handleScrollDown = () => {
    if (commentFieldRef.current) {
      const scrollContainer = commentFieldRef.current;

      setTimeout(() => {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;

        setScrollHeight(scrollContainer.scrollHeight);
      }, 0);
    }
  };

  return (
    <IconButton
      onClick={handleScrollDown}
      className={isVisibleArrow ? styles.arrowDownAppear : ""}
      sx={{
        position: "absolute",
        bottom: 80,
        right: 20,
        height: 60,
        width: 60,
        bgcolor: palette.grey.checkbox,
        transitionDuration: "0.5s",
        "&:hover": {
          bgcolor: palette.grey.active,
        },
      }}
    >
      <ExpandMoreIcon fontSize="large" />
    </IconButton>
  );
};

export { ArrowDown };
