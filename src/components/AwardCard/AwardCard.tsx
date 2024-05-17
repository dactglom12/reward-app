import React from "react";
import { CardMedia } from "@mui/material";
import { Award } from "@typings/award";
import { canPurchase } from "@utilities/awardUtils";
import { UserBalanceContext } from "@contexts/UserBalanceContext";
import {
  CardContainer,
  CardContentContainer,
  CardTitle,
  CardSubtitle,
  BottomSectionContainer,
  PriceCurrency,
  Price,
  PurchaseButton,
} from "./awardCard.styles";

interface AwardProps {
  award: Award;
  onPurchase: (award: Award) => void;
}

export const AwardCard: React.FC<AwardProps> = ({ award, onPurchase }) => {
  const { description, image, price, title } = award;
  const { balance, isLoading: isUserBalanceLoading } =
    React.useContext(UserBalanceContext);

  return (
    <CardContainer>
      <CardMedia component="img" height="200" image={image} alt={title} />

      <CardContentContainer>
        <CardTitle>{title}</CardTitle>
        <CardSubtitle>{description}</CardSubtitle>

        <BottomSectionContainer>
          <p>
            <PriceCurrency />
            <Price>{price.toFixed(2)}</Price>
          </p>
          <PurchaseButton
            disabled={isUserBalanceLoading || !canPurchase(balance, price)}
            variant="contained"
            onClick={() => onPurchase(award)}
          >
            Purchase
          </PurchaseButton>
        </BottomSectionContainer>
      </CardContentContainer>
    </CardContainer>
  );
};
