const msConverter = (ms) => {
  const seconds = (ms / 1000).toFixed(0);
  let secondsRemaining = seconds % 60;
  const minutes = Math.floor(seconds / 60);
  secondsRemaining =
    secondsRemaining.toString().length === 2
      ? secondsRemaining
      : "0" + secondsRemaining;
  return `${minutes}:${secondsRemaining}`;
};

export default msConverter;
