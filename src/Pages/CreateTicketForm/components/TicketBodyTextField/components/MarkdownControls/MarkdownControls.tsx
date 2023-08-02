import { FC, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { Button } from "@mui/material";
import Box from "@mui/material/Box";

interface MarkdownControlsProps {
  getValues: any;
}

const MarkdownControls: FC<MarkdownControlsProps> = ({ getValues }) => {
  const [markdown, setMarkdown] = useState("");
  const [display, setDisplay] = useState("none");

  const handleShowPreview = () => {
    if (display === "none") {
      setMarkdown(getValues("body"));
    }
    setDisplay(prevState => (prevState === "none" ? "block" : "none"));
  };

  return (
    <Box>
      <Box
        sx={{
          display: display,
          position: "absolute",
          width: "75%",
          height: "300%",
          top: "0",
          left: "10px",
          p: 3,
          bgcolor: "#ddd",
          color: "black",
          zIndex: 2000,
        }}
      >
        <ReactMarkdown
          children={markdown}
          remarkPlugins={[remarkGfm]}
        ></ReactMarkdown>
      </Box>
      <Button
        sx={{ zIndex: 2200 }}
        variant="contained"
        onClick={handleShowPreview}
      >
        Preview
      </Button>
    </Box>
  );
};

export { MarkdownControls };
