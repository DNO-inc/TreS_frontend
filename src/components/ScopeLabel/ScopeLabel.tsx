import { FC } from "react";

import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";
import useTheme from "@mui/material/styles/useTheme";

import { useCheckScope } from "hooks/index";
import IPalette from "theme/IPalette.interface";

interface ScopeLabelProps {
  scope: string;
  isShowTooltip?: boolean;
}

interface IScopeComponent {
  icon: JSX.Element;
  tooltipText: string;
}

const ScopeLabel: FC<ScopeLabelProps> = ({ scope, isShowTooltip = false }) => {
  const { palette }: IPalette = useTheme();

  const { icon, tooltipText }: IScopeComponent = useCheckScope(scope);

  return (
    <Tooltip title={isShowTooltip && tooltipText} arrow placement="bottom-end">
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 24,
          height: 24,
          bgcolor: palette.grey.active,
          borderRadius: 1,
          ".MuiSvgIcon-root": {
            fontSize: 16,
          },
        }}
      >
        {icon}
      </Box>
    </Tooltip>
  );
};

export { ScopeLabel };
