const wrapText = (
  text: string,
  symbolBefore: string,
  symbolAfter: string,
  input: HTMLInputElement | null
) => {
  let newText = "";

  if (input) {
    const selectionStart = input?.selectionStart && input.selectionStart;
    const selectionEnd = input?.selectionEnd && input.selectionEnd;

    if (selectionStart !== null && selectionEnd !== null) {
      const textBeforeSelection = text.slice(0, selectionStart);
      const selectedText = text.slice(selectionStart, selectionEnd).trim();
      const textAfterSelection = text.slice(selectionEnd);

      const wrappedSelectedText =
        " " + symbolBefore + selectedText + symbolAfter + " ";
      newText = `${textBeforeSelection}${wrappedSelectedText}${textAfterSelection}`;
    }
  }

  return newText || text;
};

const insertInFront = (
  text: string,
  symbol: string,
  input: HTMLInputElement | null
) => {
  let newText = "";

  if (input) {
    const selectionStart = input?.selectionStart && input.selectionStart;

    if (selectionStart !== null) {
      const textBeforeSelection = text.slice(0, selectionStart).trim();
      const textAfterSelection = text.slice(selectionStart);

      newText = textBeforeSelection + "\n" + symbol + " " + textAfterSelection;
    }
  }

  return newText || text;
};

const getFormattedText = (
  text: string,
  type: string,
  input: HTMLInputElement | null
) => {
  let formattedText = "";

  switch (type) {
    case "heading":
      formattedText = insertInFront(text, "###", input);
      break;
    case "bold":
      formattedText = wrapText(text, "**", "**", input);
      break;
    case "italic":
      formattedText = wrapText(text, "_", "_", input);
      break;
    case "code":
      formattedText = wrapText(text, "`", "`", input);
      break;
    case "strike-through":
      formattedText = wrapText(text, "~~", "~~", input);
      break;
    case "link":
      formattedText = wrapText(text, "[", "](url)", input);
      break;
    case "image":
      formattedText = wrapText(text, "![", "](url)", input);
      break;
    case "bulleted-list":
      formattedText = insertInFront(text, "- ", input);
      break;
    case "numbered-list":
      formattedText = insertInFront(text, "1.", input);
      break;
    case "check-list":
      formattedText = insertInFront(text, "- [ ]", input);
      break;
    default:
      break;
  }

  return formattedText || text;
};

export { getFormattedText };
