import { useTranslation } from "react-i18next";

const useGetDescription = (variant: string) => {
  const { t } = useTranslation();

  switch (variant) {
    case "bookmark":
      return t("snackbar.bookmark");
    case "unbookmark":
      return t("snackbar.unbookmark");
    case "like":
      return t("snackbar.like");
    case "unlike":
      return t("snackbar.unlike");
    default:
      return "Error";
  }
};

export { useGetDescription };
