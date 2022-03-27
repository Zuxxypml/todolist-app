exports.getDate = () => {
  let day = new Date();
  let options = {
    day: "numeric",
    month: "long",
    weekday: "long",
  };
  let currentDay = day.toLocaleDateString("en-US", options);
  return currentDay;
};
