const getRandomNickColor = () => {
  const hue = Math.random() * 360;
  return `hsl(${hue},80%,80%)`;
};

export { getRandomNickColor };
