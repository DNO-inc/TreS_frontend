import { FC } from "react";

import Box from "@mui/material/Box";
import Slide, { SlideProps } from "@mui/material/Slide";
import useTheme from "@mui/material/styles/useTheme";

import { useGetIcon } from "./hooks/useGetIcon";
import { useGetDescription } from "./hooks/useGetDescription";
import IPalette from "theme/IPalette.interface";

interface SlideNotificationProps {
  props: Omit<SlideProps, "direction">;
  variant: string;
}

const SlideNotification: FC<SlideNotificationProps> = ({ props, variant }) => {
  const { palette }: IPalette = useTheme();

  const icon = useGetIcon(variant);
  const description = useGetDescription(variant);

  return (
    <Slide {...props} direction="left">
      <Box
        sx={{
          fontSize: "16px",
          padding: "15px 25px 20px 20px",
          color: palette.common.white,
          backgroundColor: palette.grey.border,
          backgroundImage: "none",
          border: `1px solid ${palette.grey.active}`,
          ".MuiSvgIcon-root": {
            mr: 1.5,
            transform: "translateY(25%)",
          },
        }}
      >
        {icon}
        {description}
      </Box>
    </Slide>
  );
};

export { SlideNotification };
