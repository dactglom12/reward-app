import React from "react";
import {
  BadgeContainer,
  CoinIcon,
  CoinsAmount,
  CoinsText,
} from "./userBalanceBadge.styles";
import { UserBalanceContext } from "@contexts/UserBalanceContext";

export const UserBalanceBadge: React.FC = () => {
  const { balance, isLoading } = React.useContext(UserBalanceContext);

  return (
    <BadgeContainer>
      <CoinsText>Your coins:</CoinsText>
      <CoinIcon />
      <CoinsAmount>{isLoading ? "..." : balance}</CoinsAmount>
    </BadgeContainer>
  );
};
