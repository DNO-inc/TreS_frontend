import { useTranslation } from "react-i18next";

import { IAssignee } from "../components/TicketHeader/TicketHeader";
import { ICreator } from "../components/TicketBody/TicketBody";

const useFormatName = (person: IAssignee | ICreator) => {
  const { t } = useTranslation();

  if (!person) {
    return t("common.noAssignee");
  }

  const { firstname, lastname } = person;

  if (firstname && lastname) {
    return `${firstname} ${lastname}`;
  }

  if (firstname) {
    return `${firstname} Lastname`;
  }

  if (lastname) {
    return `Firstname ${lastname}`;
  }

  return t("common.hasAssignee");
};

export { useFormatName };
