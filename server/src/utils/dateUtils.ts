const ONE_HOUR_MS = 1 * 60 * 60 * 1000;

export const getNextDayDate = () => new Date(Date.now() + ONE_HOUR_MS * 24);
