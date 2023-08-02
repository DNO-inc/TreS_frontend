import { useTranslation } from "react-i18next";

const useFormatDate = (date: string): string => {
  if (!date) {
    return "date";
  }

  const { t } = useTranslation();
  const [year, month, day] = date.slice(0, 10).split("-");

  return `${day} ${t(`month.${month}`)} ${year}`;
};

export { useFormatDate };
