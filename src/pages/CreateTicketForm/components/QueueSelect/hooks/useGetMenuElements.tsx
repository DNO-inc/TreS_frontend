import { useTranslation } from "react-i18next";

import ListSubheader from "@mui/material/ListSubheader";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";

const useGetMenuElements = (sortedQueues: IQueueData[]) => {
  const { t } = useTranslation();
  const menuItems: JSX.Element[] = [];
  let currentScope: string | null = null;

  if (sortedQueues) {
    sortedQueues.forEach((queue: IQueueData) => {
      const isFirstItemInScope = queue.scope !== currentScope;

      if (isFirstItemInScope) {
        currentScope = queue.scope;

        menuItems.push(
          <ListSubheader key={`subheader-${currentScope}`}>
            {t(`common.${currentScope.toLowerCase()}`)}
          </ListSubheader>
        );
      }

      menuItems.push(
        <MenuItem value={queue.queue_id} key={`menuItem-${queue.queue_id}`}>
          <ListItemText primary={queue.name} />
        </MenuItem>
      );
    });
  }

  return menuItems;
};

export { useGetMenuElements };
