export const getTimestamp = () => {
  return new Date()
    .toLocaleString("sv-SE", {
      timeZone: "Asia/Jakarta",
    })
    .replace(" ", "T");
};
