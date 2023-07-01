import { ChangeEvent } from "react";
import { useTranslation } from "react-i18next";

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
  handleChange: (id: number) => (event: ChangeEvent<HTMLInputElement>) => void
): StatusFullObject[] => {
  const { t } = useTranslation();

  return [
    {
      id: 0,
      query: "accepted",
      label: t("statusesFilter.accepted"),
      color: "#E09C36",
    },
    {
      id: 1,
      query: "open",
      label: t("statusesFilter.open"),
      color: "#2982D3",
    },
    {
      id: 2,
      query: "waiting",
      label: t("statusesFilter.waiting"),
      color: "#9E3DFF",
    },
    {
      id: 3,
      query: "close",
      label: t("statusesFilter.close"),
      color: "#68B651",
    },
  ].map(status => ({
    ...status,
    checked: !!checked[status.id],
    onChange: handleChange(status.id),
  }));
};

export const useGetStatusesName = (): string[] => {
  return ["accepted", "open", "waiting", "close"];
};
