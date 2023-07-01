const checkStatus = (status: string): string => {
  switch (status) {
    case "NEW":
      return "#FFFFFF";
    case "ACCEPTED":
      return "#E09C36";
    case "OPEN":
      return "#2982D3";
    case "WAITING":
      return "#9E3DFF";
    case "REJECTED":
      return "#D94B44";
    case "CLOSE":
      return "#68B651";
    default:
      return "#2982D3";
  }
};

export { checkStatus };
