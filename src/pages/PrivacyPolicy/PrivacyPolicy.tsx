import { FC } from "react";
import { useTranslation } from "react-i18next";

import Box from "@mui/material/Box";

const PrivacyPolicy: FC = () => {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        maxWidth: 1000,
        m: "0 auto",
        p: { xs: "16px 24px", sm: "24px 48px" },
        div: {
          "h1, h2": {
            mb: 1.5,
          },
          "& p": {
            mb: 2,
          },
        },
      }}
    >
      <div>
        <h1>{t("privacyPolicy.disclaimer.heading")}</h1>
        <p>{t("privacyPolicy.disclaimer.contacts")}</p>
      </div>
      <div>
        <h2>{t("privacyPolicy.disclaimer.heading")}</h2>
        <p>{t("privacyPolicy.disclaimer.paragraph1")}</p>
        <p>{t("privacyPolicy.disclaimer.paragraph2")}</p>
        <p>{t("privacyPolicy.disclaimer.paragraph3")}</p>
      </div>
      <div>
        <h2>{t("privacyPolicy.consent.heading")}</h2>
        <p>{t("privacyPolicy.consent.paragraph")}</p>
      </div>
      <div>
        <h2>{t("privacyPolicy.update.heading")}</h2>
        <p>{t("privacyPolicy.update.paragraph")}</p>
      </div>
    </Box>
  );
};

export { PrivacyPolicy };
