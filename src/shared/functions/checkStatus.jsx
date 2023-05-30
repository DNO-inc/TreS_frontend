import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import SignLanguageIcon from "@mui/icons-material/SignLanguage";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";

const checkStatus = status => {
  switch (status) {
    case "open":
      return { color: "#2982D3", icon: <FlagOutlinedIcon fontSize={"12px"} /> };
    case "closed":
      return { color: "#68B651", icon: <HelpOutlineIcon fontSize={"12px"} /> };
    case "accepted":
      return { color: "#E09C36", icon: <SignLanguageIcon fontSize={"12px"} /> };
    case "rejected":
      return { color: "#D94B44", icon: <FlagOutlinedIcon fontSize={"12px"} /> };
    default:
      return { color: "#2982D3", icon: <FlagOutlinedIcon fontSize={"12px"} /> };
  }
};

export { checkStatus };
