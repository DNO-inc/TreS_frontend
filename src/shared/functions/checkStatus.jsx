import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import SignLanguageIcon from "@mui/icons-material/SignLanguage";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";
import FiberNewIcon from "@mui/icons-material/FiberNew";

const checkStatus = status => {
  switch (status) {
    case "NEW":
      return { color: "#888888", icon: <FiberNewIcon fontSize={"12px"} /> };
    case "ACCEPTED":
      return { color: "#E09C36", icon: <SignLanguageIcon fontSize={"12px"} /> };
    case "OPEN":
      return { color: "#2982D3", icon: <FlagOutlinedIcon fontSize={"12px"} /> };
    case "WAITING":
      return { color: "#9E3DFF", icon: <FlagOutlinedIcon fontSize={"12px"} /> };
    case "REJECTED":
      return { color: "#D94B44", icon: <FlagOutlinedIcon fontSize={"12px"} /> };
    case "CLOSE":
      return { color: "#68B651", icon: <HelpOutlineIcon fontSize={"12px"} /> };
    default:
      return { color: "#2982D3", icon: <FlagOutlinedIcon fontSize={"12px"} /> };
  }
};

export { checkStatus };
