import { FC } from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import remarkGfm from "remark-gfm";

import styles from "./MarkdownWithStyles.module.css";

interface MarkdownWithStylesProps {
  innerText: string;
}

const MarkdownWithStyles: FC<MarkdownWithStylesProps> = ({ innerText }) => {
  return (
    <ReactMarkdown
      components={{
        input: ({ checked }) => {
          return (
            <input
              type="checkbox"
              disabled={false}
              checked={checked}
              onChange={() => {}}
            />
          );
        },
      }}
      className={styles.markdown}
      children={innerText}
      remarkPlugins={[remarkGfm]}
    ></ReactMarkdown>
  );
};

export { MarkdownWithStyles };
