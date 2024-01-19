import { useTheme } from "@mui/material";
import SvgIcon from "@mui/material/SvgIcon";

import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";

import IPalette from "theme/IPalette.interface";

const useGetIcon = (variant: string) => {
  const { palette }: IPalette = useTheme();

  switch (variant) {
    case "bookmark":
      return (
        <SvgIcon sx={{ color: palette.semantic.info }} component={StarIcon} />
      );

    case "unbookmark":
      return <SvgIcon component={StarBorderIcon} />;

    case "like":
      return (
        <SvgIcon
          sx={{ color: palette.semantic.error }}
          component={FavoriteIcon}
        />
      );

    case "unlike":
      return <SvgIcon component={FavoriteBorderIcon} />;

    default:
      return <div>Error</div>;
  }
};

export { useGetIcon };
