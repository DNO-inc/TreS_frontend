import { useTranslation } from "react-i18next";

import FolderIcon from "@mui/icons-material/Folder";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";

import { endpoints } from "../../../../../../../../../../constants";
import { checkIsAdmin } from "../../../../../../../../../../shared/functions";

interface ListItem {
  text: string;
  icon: JSX.Element;
  endpoint: string;
  isHaveNewMessage: boolean;
}

const useGetListItemsArray = (selectedKey: string): ListItem[] => {
  const { t } = useTranslation();

  const isAdmin = checkIsAdmin();

  const listItemsArrayForUser = [
    {
      text: t("sidebar.myTickets.sent"),
      icon:
        selectedKey === endpoints.sent ? <FolderIcon /> : <FolderOpenIcon />,
      endpoint: endpoints.sent,
      isHaveNewMessage: false,
    },
    {
      text: t("sidebar.myTickets.followed"),
      icon:
        selectedKey === endpoints.followed ? <StarIcon /> : <StarBorderIcon />,
      endpoint: endpoints.followed,
      isHaveNewMessage: false,
    },
    {
      text: t("sidebar.myTickets.bookmarks"),
      icon:
        selectedKey === endpoints.bookmarks ? (
          <BookmarkIcon />
        ) : (
          <BookmarkBorderIcon />
        ),
      endpoint: endpoints.bookmarks,
      isHaveNewMessage: false,
    },
    {
      text: t("sidebar.myTickets.deleted"),
      icon:
        selectedKey === endpoints.deleted ? (
          <DeleteIcon />
        ) : (
          <DeleteOutlineIcon />
        ),
      endpoint: endpoints.deleted,
      isHaveNewMessage: false,
    },
  ];

  const listItemsArrayForAdmin = [
    {
      text: t("sidebar.myTickets.received"),
      icon: <FolderOpenIcon />,
      endpoint: endpoints.received,
      isHaveNewMessage: false,
    },
    ...listItemsArrayForUser,
  ];

  return isAdmin ? listItemsArrayForAdmin : listItemsArrayForUser;
};

export default useGetListItemsArray;
