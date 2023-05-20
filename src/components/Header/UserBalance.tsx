import React from "react";
import { Typography } from "@material-ui/core";

interface UserBalanceProps {
  balance: number;
}

export const UserBalance: React.FC<UserBalanceProps> = ({ balance }) => {
  return (
    <Typography variant="h6" component="span" color="secondary">
      Balance: {balance}
    </Typography>
  );
};
