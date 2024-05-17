// TODO: rename to useToggle
import { useOpenCloseToggle as useToggle } from "@hooks/useOpenCloseToggle";
import { styled } from "@mui/material";
import { Colors } from "constants/styles";
import React, { useEffect } from "react";

interface CardDimensions {
  cardWidth?: number | string;
  cardHeight?: number | string;
}

interface FlippableCardProps extends CardDimensions {
  frontContent: JSX.Element;
  backContent: JSX.Element;
  onFlip?: () => void;
}

const Card = styled("div")({
  height: "300px",
  perspective: "1000px",
  cursor: "pointer",
});

const Inner = styled("div")({
  position: "relative",
  width: "100%",
  height: "100%",
  textAlign: "center",
  transition: "transform 0.8s",
  transformStyle: "preserve-3d",
  "&.active": {
    transform: "rotateY(180deg)",
  },
});

const FlipShared = styled("div")(({ theme }) => ({
  position: "absolute",
  width: "100%",
  height: "100%",
  backfaceVisibility: "hidden",
  backgroundColor: Colors.WHITE,
  boxShadow:
    "rgba(0, 0, 0, 0.2) 0px 2px 1px -1px, rgba(0, 0, 0, 0.14) 0px 1px 1px 0px, rgba(0, 0, 0, 0.12) 0px 1px 3px 0px",
  borderRadius: theme.spacing(1),
  overflow: "hidden",
}));

const FlipBack = styled(FlipShared)({
  transform: "rotateY(180deg)",
});

export const FlippableCard: React.FC<FlippableCardProps> = ({
  backContent,
  frontContent,
  onFlip,
}) => {
  const { isOpen, handleToggle } = useToggle();

  useEffect(() => {
    if (isOpen && onFlip) {
      onFlip();
    }
  }, [isOpen, onFlip]);

  return (
    <Card onClick={handleToggle}>
      <Inner className={isOpen ? "active" : ""}>
        <FlipShared>{frontContent}</FlipShared>
        <FlipBack>{backContent}</FlipBack>
      </Inner>
    </Card>
  );
};
