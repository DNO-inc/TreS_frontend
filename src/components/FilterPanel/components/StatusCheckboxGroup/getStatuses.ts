import { ChangeEvent } from "react";
import { useTranslation } from "react-i18next";

import { useTheme } from "@mui/material";

import IPalette from "../../../../theme/IPalette.interface";

interface StatusFullObject {
  id: number;
  query: string;
  label: string;
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
): StatusFullObject[] => {
  const { t } = useTranslation();
  const { palette }: IPalette = useTheme();

  if (!isAllStatuses) {
    return [
      {
        id: 0,
        query: "accepted",
        label: t("statusesFilter.accepted"),
        color: palette.semantic.warning,
      },
      {
        id: 1,
        query: "open",
        label: t("statusesFilter.open"),
        color: palette.semantic.info,
      },
      {
        id: 2,
        query: "waiting",
        label: t("statusesFilter.waiting"),
        color: palette.semantic.waiting,
      },
      {
        id: 3,
        query: "close",
        label: t("statusesFilter.close"),
        color: palette.semantic.success,
      },
    ].map(status => ({
      ...status,
      checked: !!checked[status.id],
      onChange: handleChange(status.id),
    }));
  }

  return [
    {
      id: 0,
      query: "accepted",
      label: t("statusesFilter.accepted"),
      color: palette.semantic.warning,
    },
    {
      id: 1,
      query: "open",
      label: t("statusesFilter.open"),
      color: palette.semantic.info,
    },
    {
      id: 2,
      query: "waiting",
      label: t("statusesFilter.waiting"),
      color: palette.semantic.waiting,
    },
    {
      id: 3,
      query: "close",
      label: t("statusesFilter.close"),
      color: palette.semantic.success,
    },
    {
      id: 4,
      query: "new",
      label: t("statusesFilter.new"),
      color: palette.semantic.new,
    },
    {
      id: 5,
      query: "rejected",
      label: t("statusesFilter.rejected"),
      color: palette.semantic.error,
    },
  ].map(status => ({
    ...status,
    checked: !!checked[status.id],
    onChange: handleChange(status.id),
  }));
};

export const useGetStatusesName = (isAllStatuses: boolean): string[] => {
  if (!isAllStatuses) {
    return ["accepted", "open", "waiting", "close"];
  }

  return ["accepted", "open", "waiting", "close", "new", "rejected"];
};
