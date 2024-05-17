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
  borderRadius: "1.2rem",
  paddingRight: "1.8rem",
  paddingLeft: "1.8rem",
  paddingBottom: "1.8rem",
  paddingTop: "2rem",
  backgroundColor: Colors.WHITE,
});

export const Card: React.FC<CardProps> = ({ children, ...rest }) => {
  return <CardContainer {...rest}>{children}</CardContainer>;
};
