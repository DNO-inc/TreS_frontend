import SvgIcon from "@mui/material/SvgIcon";

import ArticleIcon from "@mui/icons-material/Article";
import DescriptionIcon from "@mui/icons-material/Description";
import InventoryIcon from "@mui/icons-material/Inventory";
import VideoFileIcon from "@mui/icons-material/VideoFile";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import AudioFileIcon from "@mui/icons-material/AudioFile";
import ImageIcon from "@mui/icons-material/Image";

const getFileIcon = (fileName: string) => {
  const fileNameArray = fileName.split(".");
  const extensionName = fileNameArray[fileNameArray.length - 1];

  switch (extensionName) {
    case "pdf":
      return (
        <SvgIcon>
          <PictureAsPdfIcon />
        </SvgIcon>
      );
    case "mp4":
      return (
        <SvgIcon>
          <VideoFileIcon />
        </SvgIcon>
      );
    case "mp3":
      return (
        <SvgIcon>
          <AudioFileIcon />
        </SvgIcon>
      );
    case "jpg":
    case "jif":
    case "webp":
      return (
        <SvgIcon>
          <ImageIcon />
        </SvgIcon>
      );
    case "txt":
      return (
        <SvgIcon>
          <ArticleIcon />
        </SvgIcon>
      );
    case "zip":
      return (
        <SvgIcon>
          <InventoryIcon />
        </SvgIcon>
      );
    default:
      return (
        <SvgIcon>
          <DescriptionIcon />
        </SvgIcon>
      );
  }
};

export { getFileIcon };
