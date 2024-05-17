import { Button, Card } from "@mui/material";
import { Colors } from "constants/styles";
import { Box, styled } from "@mui/material";
import { ReactComponent as CoinIcon } from "@assets/icons/coin.svg";

export const CardContainer = styled(Card)(() => ({
  boxShadow:
    "rgba(0, 0, 0, 0.2) 0px 2px 1px -1px, rgba(0, 0, 0, 0.14) 0px 1px 1px 0px, rgba(0, 0, 0, 0.12) 0px 1px 3px 0px",
  borderRadius: "1rem",
  minWidth: "300px",
}));

export const CardContentContainer = styled(Box)(() => ({
  paddingRight: "1.2rem",
  paddingLeft: "1.2rem",
  paddingBottom: "1.2rem",
  paddingTop: "1.4rem",
}));

export const CardTitle = styled("p")(({ theme }) => ({
  letterSpacing: "-.025em",
  fontWeight: 700,
  fontFamily: theme.typography.fontFamily,
  fontSize: "2rem",
  lineHeight: "1.25",
}));

export const CardSubtitle = styled("p")(({ theme }) => ({
  fontSize: "1rem",
  fontWeight: 500,
  color: Colors.DARK_GREY,
  fontFamily: theme.typography.fontFamily,
  marginTop: "0.4rem",
}));

export const Price = styled("span")(({ theme }) => ({
  fontSize: "1.4rem",
  fontFamily: theme.typography.fontFamily,
  fontWeight: 600,
  letterSpacing: "-.05em",
}));

export const PriceCurrency = styled(CoinIcon)(({ theme }) => ({
  width: "1.2rem",
  height: "1.2rem",
  marginRight: theme.spacing(0.5),
}));

export const BottomSectionContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2),
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
}));

export const PurchaseButton = styled(Button)(() => ({
  fontSize: "1rem",
}));
