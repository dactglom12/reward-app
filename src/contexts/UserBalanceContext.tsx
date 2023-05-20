import { BalanceApi } from "@api/balanceApi";
import { WithReactChildren } from "@typings/shared";
import * as React from "react";

interface UserBalanceContextValue {
  balance: number;
  updateBalance: (updateSum: number) => void;
  isLoading: boolean;
  getUserBalance: () => void;
}

export const UserBalanceContext = React.createContext(
  {} as UserBalanceContextValue
);

export const UserBalanceProvider: React.FC<WithReactChildren> = ({
  children,
}) => {
  const [balance, setBalance] = React.useState<number>();
  const [isLoading, setIsLoading] = React.useState(true);

  const getUserBalance = React.useCallback(() => {
    setIsLoading(true);

    BalanceApi.getUserBalance()
      .then((response) => {
        setBalance(response.data.balance.balance);
      })
      .catch(console.error)
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const updateBalance = React.useCallback(
    (updateSum: number) => {
      const optimisticallyUpdatedBalance = updateSum + (balance ?? 0);

      setBalance(optimisticallyUpdatedBalance);
    },
    [balance]
  );

  const value = React.useMemo(
    () => ({
      updateBalance,
      balance: balance ?? 0,
      isLoading,
      getUserBalance,
    }),
    [updateBalance, balance, isLoading, getUserBalance]
  );

  return (
    <UserBalanceContext.Provider value={value}>
      {children}
    </UserBalanceContext.Provider>
  );
};
