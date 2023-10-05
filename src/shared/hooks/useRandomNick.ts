const useRandomNick = (firstname = "", lastname = ""): string => {
  if (firstname && lastname) {
    return `${firstname} ${lastname}`;
  } else if (firstname) {
    return firstname;
  } else if (lastname) {
    return lastname;
  }

  let nick = "Unknown";
  const randomize = ["Tiger", "Penguin", "Giraffe", "Dolphin", "Koala"];

  return nick + " " + randomize[Math.floor(Math.random() * randomize.length)];
};

export { useRandomNick };
