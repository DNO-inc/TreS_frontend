import { useTranslation } from "react-i18next";

export const useGetStatusesFullObject = (
  checked: boolean[],
  handleChange: (id: number) => void
) => {
  const { t } = useTranslation();

  return [
    {
      id: 0,
      label: t("statusesFilter.accepted"),
      color: "#E09C36",
    },
    {
      id: 1,
      label: t("statusesFilter.open"),
      color: "#2982D3",
    },
    {
      id: 2,
      label: t("statusesFilter.waiting"),
      color: "#9E3DFF",
    },
    {
      id: 3,
      label: t("statusesFilter.close"),
      color: "#68B651",
    },
  ].map(obj => ({
    ...obj,
    checked: !!checked[obj.id],
    onChange: handleChange(obj.id),
  }));
};

export const useGetStatusesName = () => {
  const { t } = useTranslation();

  return [
    t("statusesFilter.accepted"),
    t("statusesFilter.open"),
    t("statusesFilter.waiting"),
    t("statusesFilter.close"),
  ];
};
