import { ChangeEvent } from "react";
import { useTranslation } from "react-i18next";

import useTheme from "@mui/material/styles/useTheme";

import IPalette from "../../../../theme/IPalette.interface";
import { statuses } from "../../../../constants";

export interface IStatusFullObject {
  id: number;
  name: string;
  color: string;
  checked: boolean;
  onChange:
    | ((event: ChangeEvent<HTMLInputElement>, checked: boolean) => void)
    | undefined;
}

export const useGetStatusesFullObject = (
  checked: boolean[],
  isAllStatuses: boolean,
  handleChange: (id: number) => (event: ChangeEvent<HTMLInputElement>) => void
): IStatusFullObject[] => {
  const { t } = useTranslation();
  const { palette }: IPalette = useTheme();

  const getStatusObject = (
    id: number,
    name: string,
    color: string,
    checked: boolean
  ) => ({
    id,
    name: t(`statusesFilter.${name}`),
    color: palette.semantic[color],
    checked,
    onChange: handleChange(id),
  });

  const commonStatuses = [
    { id: 0, name: statuses.ACCEPTED, color: "warning" },
    { id: 1, name: statuses.OPEN, color: "info" },
    { id: 2, name: statuses.WAITING, color: "waiting" },
    { id: 3, name: statuses.CLOSE, color: "success" },
    { id: 4, name: statuses.REJECTED, color: "error" },
  ];

  const additionalStatuses = isAllStatuses
    ? [{ id: 5, name: statuses.NEW, color: "new" }]
    : [];

  return [...commonStatuses, ...additionalStatuses].map(status =>
    getStatusObject(status.id, status.name, status.color, !!checked[status.id])
  );
};

export const useGetStatusesName = (isAllStatuses: boolean): string[] => {
  const commonStatusesName = [
    statuses.ACCEPTED,
    statuses.OPEN,
    statuses.WAITING,
    statuses.CLOSE,
    statuses.REJECTED,
  ];

  if (!isAllStatuses) {
    return commonStatusesName;
  }

  return [...commonStatusesName, statuses.NEW];
};
