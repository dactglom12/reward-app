const formatTimeUnit = (timeUnit: number) =>
  timeUnit < 10 ? `0${timeUnit}` : timeUnit;

export const getApiCompatibleDate = (date: Date) => {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();

  const formattedMonth = formatTimeUnit(month);
  const formattedDay = formatTimeUnit(day);

  return `${formattedMonth}-${formattedDay}-${year}`;
};

export const getDisplayableDate = (date: Date, withTime = false) => {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();

  const dateString = `${formatTimeUnit(day)}.${formatTimeUnit(month)}.${year}`;

  if (!withTime) return dateString;

  const hours = date.getHours();
  const minutes = date.getMinutes();

  return `${dateString} ${formatTimeUnit(hours)}:${formatTimeUnit(minutes)}`;
};
