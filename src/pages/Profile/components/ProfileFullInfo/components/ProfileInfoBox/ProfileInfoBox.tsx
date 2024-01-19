import { FC } from "react";
import { useTranslation } from "react-i18next";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

interface ProfileInfoBoxProps {
  label: string;
  value?: string;
}

const ProfileInfoBox: FC<ProfileInfoBoxProps> = ({ label, value }) => {
  const { t } = useTranslation();

  return (
    <Box>
      <Typography>{t(`profile.${label}`)}</Typography>
      <Typography>{value}</Typography>
    </Box>
  );
};

export { ProfileInfoBox };
