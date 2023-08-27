const getDescription = (variant: string) => {
  switch (variant) {
    case "report":
      return "For now, I don't know what's going to happen";
    case "follow":
      return "You just followed this ticket";
    case "unfollow":
      return "You are no longer following this ticket";
    case "like":
      return "You just liked this ticket";
    case "unlike":
      return "You don't like this ticket anymore?";
    default:
      return "Error";
  }
};

export default getDescription;
