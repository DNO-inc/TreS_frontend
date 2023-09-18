import { useTranslation } from "react-i18next";

const useRandomNick = (firstname = "", lastname = ""): string => {
  const { t } = useTranslation();

  if (firstname && lastname) {
    return `${firstname} ${lastname}`;
  } else if (firstname) {
    return firstname;
  } else if (lastname) {
    return lastname;
  }

  let nick = t("nicks.unknown");
  const randomize = [
    t("nicks.tiger"),
    t("nicks.penguin"),
    t("nicks.giraffe"),
    t("nicks.dolphin"),
    t("nicks.koala"),
  ];

  return nick + " " + randomize[Math.floor(Math.random() * randomize.length)];
};

export { useRandomNick };
