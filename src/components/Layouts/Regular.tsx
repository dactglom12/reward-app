import React from "react";
import { Header } from "@components/Header";
import { useTheme } from "@material-ui/core";

interface Props {
  children: React.ReactNode;
}

export const RegularLayout: React.FC<Props> = ({ children }) => {
  const theme = useTheme();

  return (
    <div>
      <Header />
      <div style={{ padding: theme.spacing(2) }}>{children}</div>
    </div>
  );
};
