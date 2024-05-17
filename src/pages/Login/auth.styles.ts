import { TextField, styled, Button as MuiButton } from "@mui/material";
import { Colors } from "constants/styles";
import { NavLink } from "react-router-dom";

export const Title = styled("p")(({ theme }) => ({
  letterSpacing: "-.025em",
  fontWeight: 800,
  fontSize: "2.4rem",
  fontFamily: theme.typography.fontFamily,
}));

export const SubtitleSectionContainer = styled("div")(({ theme }) => ({
  display: "flex",
  width: "100%",
  alignItems: "center",
  marginTop: theme.spacing(1),
}));

export const Subtitle = styled("span")(({ theme }) => ({
  lineHeight: 1.5,
  fontSize: "1rem",
  fontWeight: 400,
  color: Colors.DARK_BLUE,
  fontFamily: theme.typography.fontFamily,
  marginRight: theme.spacing(1),
}));

export const SignUpLink = styled(NavLink)(({ theme }) => ({
  fontFamily: theme.typography.fontFamily,
  fontSize: "1rem",
  fontWeight: 500,
}));

export const InputContainer = styled(TextField)(({ theme }) => ({
  "& input": {
    fontSize: "1.4rem !important",
    fontFamily: theme.typography.fontFamily,
    color: Colors.DARK_BLUE,
    cursor: "text",
  },
  "& label": {
    fontSize: "1.2rem !important",
    fontFamily: theme.typography.fontFamily,
    color: Colors.DARK_BLUE,
    cursor: "text",
  },
  marginTop: theme.spacing(2),
}));

export const Button = styled(MuiButton)(({ theme }) => ({
  fontFamily: theme.typography.fontFamily,
  fontWeight: 500,
  fontSize: "1.1rem",
  marginTop: theme.spacing(3),
}));
