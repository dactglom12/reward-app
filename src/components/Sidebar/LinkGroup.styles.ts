import { Box, Typography, styled, Link as MuiLink } from "@mui/material";
import { Colors } from "constants/styles";

export const Container = styled(Box)({
  display: "flex",
  flexDirection: "column",
});

export const GroupHeaderContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(1),
  paddingLeft: "18px",
  marginTop: theme.spacing(2),
  boxSizing: "border-box",
}));

export const GroupTitle = styled(Typography)({
  color: Colors.PURPLE,
  textTransform: "uppercase",
  lineHeight: "20px",
  fontWeight: 600,
  fontSize: "1.2rem !important",
});

export const GroupSubtitle = styled(Typography)({
  color: Colors.LIGHT_GREY,
  letterSpacing: "0.06px",
  fontSize: "1.1rem !important",
  fontWeight: 500,
});

export const Link = styled(MuiLink)({
  borderRadius: "6px",
  border: "none",
  color: "rgba(255, 255, 255, 0.7)",
  transition: "background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
  display: "flex",
  alignItems: "center",
  padding: "10px 16px",
  textDecoration: "none !important",
  marginBottom: "8px",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    color: Colors.WHITE,
  },
});

export const ActiveLink = styled(Link)({
  color: Colors.WHITE,
  backgroundColor: "rgba(255, 255, 255, 0.1) !important",
});

export const LinkTitle = styled(Typography)(({ theme }) => ({
  marginLeft: theme.spacing(1),
  fontSize: "1.4rem !important",
}));

export const LinkIcon = styled(Box)(() => ({
  "& > svg": {
    width: "24px",
    height: "24px",
  },
}));
