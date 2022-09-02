export const formatDate = (date) => {
  let format = new Date(date);
  return format.toDateString();
};

export const formatDateTime = (datetime) => {
  let format = new Date(datetime);
  if (isNaN(format.valueOf())) {
    return format;
  }
  return format.toUTCString();
};
