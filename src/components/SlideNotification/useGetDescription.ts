import { useTranslation } from "react-i18next";

const useGetDescription = (variant: string) => {
  const { t } = useTranslation();

  switch (variant) {
    case "report":
      return t("snackbar.report");
    case "follow":
      return t("snackbar.follow");
    case "unfollow":
      return t("snackbar.unfollow");
    case "like":
      return t("snackbar.like");
    case "unlike":
      return t("snackbar.unlike");
    default:
      return "Error";
  }
};

export default useGetDescription;
