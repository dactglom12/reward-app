import React from "react";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

const Root = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "90vh",
  backgroundColor: theme.palette.background.default,
}));

const Text = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(2),
  color: theme.palette.text.secondary,
}));

export const NotFoundPage: React.FC = () => {
  return (
    <Root>
      <Typography variant="h2" align="center">
        404
      </Typography>
      <Text variant="h5" align="center">
        Oops! We couldn't find the page you're looking for.
      </Text>
    </Root>
  );
};
