export const formatDate = (date) => {
  let format = new Date(date);
  return `${format.getFullYear()}-${format.getMonth()}-${format.getDate()} ${format.getHours()}:${format.getMinutes()}:${format.getSeconds()}`;
};
