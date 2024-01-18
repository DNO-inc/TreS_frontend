import { FC, ReactElement, ReactNode } from "react";

import { useTheme } from "@mui/material";
import { styled } from "@mui/material/styles";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";

import IPalette from "theme/IPalette.interface";

interface CustomTooltipProps {
  base: ReactElement;
  open?: boolean;
  children: ReactNode;
}

const LightTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => {
  const { palette }: IPalette = useTheme();

  return {
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: palette.grey.divider,
      padding: "16px",
      border: `2px solid ${palette.grey.button}`,
      boxShadow: theme.shadows[1],
    },
  };
});

const CustomTooltip: FC<CustomTooltipProps> = ({ base, open, children }) => {
  return (
    <LightTooltip
      arrow
      disableHoverListener={open !== undefined}
      open={open}
      placement="top"
      title={children}
    >
      {base}
    </LightTooltip>
  );
};

export { CustomTooltip };
