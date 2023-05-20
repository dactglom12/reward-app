import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  CardActions,
} from "@material-ui/core";
import { Award } from "@typings/award";
import { canPurchase } from "@utilities/awardUtils";
import { UserBalanceContext } from "@contexts/UserBalanceContext";

interface AwardProps {
  award: Award;
  onPurchase: (award: Award) => void;
}

export const AwardCard: React.FC<AwardProps> = ({ award, onPurchase }) => {
  const { description, image, price, title } = award;
  const { balance, isLoading: isUserBalanceLoading } =
    React.useContext(UserBalanceContext);

  return (
    <Card>
      <CardMedia component="img" height="200" image={image} alt={title} />
      <CardContent>
        <Typography variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          Cost: {price}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          disabled={!isUserBalanceLoading && !canPurchase(balance, price)}
          variant="contained"
          onClick={() => onPurchase(award)}
        >
          Purchase
        </Button>
      </CardActions>
    </Card>
  );
};
