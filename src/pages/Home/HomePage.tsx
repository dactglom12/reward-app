import React from "react";
import { styled } from "@mui/material/styles";
import Container from "@mui/material/Container";
import { RightPanel } from "./RightPanel";

const Root = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(4),
}));

interface Props {}

export const HomePage: React.FC<Props> = () => {
  return (
    <Root>
      <RightPanel />
    </Root>
  );
};
