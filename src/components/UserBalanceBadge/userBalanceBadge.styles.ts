import { styled } from "@mui/material";
import { Colors } from "constants/styles";
import { ReactComponent as CoinSvg } from "@assets/icons/coin.svg";

export const BadgeContainer = styled("div")({
  borderRadius: "1.2rem",
  padding: `1.2rem`,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "rgba(0, 0, 0, 0.3)",
});

export const CoinsText = styled("span")(({ theme }) => ({
  fontFamily: theme.typography.fontFamily,
  color: Colors.WHITE,
  fontSize: "1rem",
  marginRight: theme.spacing(1),
}));

export const CoinIcon = styled(CoinSvg)(() => ({
  width: "1rem",
  height: "1rem",
}));

export const CoinsAmount = styled("span")(({ theme }) => ({
  fontFamily: theme.typography.fontFamily,
  fontWeight: 700,
  fontSize: "1rem",
  marginLeft: theme.spacing(1),
  color: Colors.BRIGHT_YELLOW,
}));
