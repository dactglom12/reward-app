import * as React from "react";

export const useDateRangeManager = () => {
  const [startDate, setStartDate] = React.useState(new Date());
  const [endDate, setEndDate] = React.useState(new Date());

  const handleEndDateChange = React.useCallback((newDate: Date) => {
    setEndDate(newDate);
  }, []);
  const handleStartDateChange = React.useCallback((newDate: Date) => {
    setStartDate(newDate);
  }, []);

  return {
    startDate,
    endDate,
    handleEndDateChange,
    handleStartDateChange,
  };
};
