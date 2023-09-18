const useRandomNickColor = () => {
  const hue = Math.random() * 360;
  return `hsl(${hue},80%,80%)`;
};

export default useRandomNickColor;
