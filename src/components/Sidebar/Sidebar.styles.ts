import { Avatar as MuiAvatar, Grid, Typography, styled } from "@mui/material";
import { Colors } from "constants/styles";

export const MobileClose = styled("div")(({ theme }) => ({
  position: "absolute",
  top: 0,
  right: 0,
  padding: theme.spacing(1),
  zIndex: theme.zIndex.modal + 1,
}));

export const UserTitle = styled(Typography)({
  fontWeight: 500,
  color: Colors.WHITE,
  lineHeight: "1.5",
  fontSize: "1rem",
});

export const UserInfoContainer = styled(Grid)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: theme.spacing(4),
}));

export const UserEmail = styled(Typography)(() => ({
  fontWeight: 500,
  color: Colors.GREY,
  fontSize: "0.9rem",
}));

export const Avatar = styled(MuiAvatar)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: theme.spacing(4),
}));

export const LinkGroupsContainer = styled(Grid)(() => ({
  padding: "0 0.8rem",
  display: "flex",
  flexDirection: "column",
}));

export const UserBalanceContainer = styled("div")(({ theme }) => ({
  marginTop: theme.spacing(2),
}));
