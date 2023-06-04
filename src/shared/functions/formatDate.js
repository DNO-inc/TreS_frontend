const formatDate = date => {
  return date.slice(0, 10).split("-").reverse().join(".");
};

export { formatDate };
