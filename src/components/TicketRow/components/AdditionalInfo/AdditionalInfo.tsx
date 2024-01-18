import { FC } from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import useTheme from "@mui/material/styles/useTheme";

import IPalette from "theme/IPalette.interface";
import { useFormatDate } from "hooks/index";

interface AdditionalInfoProps {
  facultyName: string;
  dateOfCreation: string;
  matches: boolean;
}

const AdditionalInfo: FC<AdditionalInfoProps> = ({
  facultyName,
  dateOfCreation,
  matches,
}) => {
  const { palette }: IPalette = useTheme();

  const formattedDate: string = dateOfCreation && useFormatDate(dateOfCreation);

  return (
    <>
      {matches ? (
        <>
          <Typography
            component={"p"}
            sx={{ color: palette.whiteAlpha.default }}
          >
            {facultyName}
          </Typography>
          <Typography
            component={"p"}
            sx={{ color: palette.whiteAlpha.default }}
          >
            {formattedDate}
          </Typography>
        </>
      ) : (
        <>
          <Box
            sx={{
              pl: 1,
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography
              component={"p"}
              sx={{ color: palette.whiteAlpha.default }}
            >
              {facultyName}
            </Typography>
            <Typography
              component={"p"}
              sx={{ color: palette.whiteAlpha.default }}
            >
              {formattedDate}
            </Typography>
          </Box>
        </>
      )}
    </>
  );
};

export { AdditionalInfo };
