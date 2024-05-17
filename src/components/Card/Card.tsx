import { styled } from "@mui/material";
import { WithReactChildren } from "@typings/shared";
import { Colors } from "constants/styles";
import React from "react";

interface CardProps
  extends WithReactChildren,
    Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {}

// component is small, no extra file for styles needed
const CardContainer = styled("div")({
  boxShadow:
    "rgba(0, 0, 0, 0.2) 0px 2px 1px -1px, rgba(0, 0, 0, 0.14) 0px 1px 1px 0px, rgba(0, 0, 0, 0.12) 0px 1px 3px 0px",
  borderRadius: "1.6rem",
  paddingRight: "2.4rem",
  paddingLeft: "2.4rem",
  paddingBottom: "2.4rem",
  paddingTop: "2.6rem",
  backgroundColor: Colors.WHITE,
});

export const Card: React.FC<CardProps> = ({ children, ...rest }) => {
  return <CardContainer {...rest}>{children}</CardContainer>;
};
