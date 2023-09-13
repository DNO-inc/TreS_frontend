const useRandomNickColor = () => {
  const hue = Math.random() * 360;
  return `hsl(${hue},70%,65%)`;
};

export default useRandomNickColor;
