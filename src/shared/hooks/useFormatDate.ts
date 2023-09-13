import { useTranslation } from "react-i18next";

type DateFormat = "time" | "date" | "full";

const useFormatDate = (
  date: string,
  dateFormat: DateFormat = "date"
): string => {
  if (!date || !dateFormat) {
    return "date";
  }

  const { t } = useTranslation();

  if (dateFormat === "time") {
    const time = date.slice(10, 16);

    return time;
  } else if (dateFormat === "date") {
    const [year, month, day] = date.slice(0, 10).split("-");
    const formattedDate = `${day} ${t(`month.${month}`)} ${year}`;

    return formattedDate;
  } else if (dateFormat === "full") {
    const time = date.slice(10, 16);
    const [year, month, day] = date.slice(0, 10).split("-");
    const formattedDate = `${day} ${t(`month.${month}`)} ${year}`;

    return `${time} ${formattedDate}`;
  }

  return "date";
};

export { useFormatDate };
