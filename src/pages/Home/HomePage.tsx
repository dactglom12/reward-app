import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { LeftPanel } from "./LeftPanel";
import { RightPanel } from "./RightPanel";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(4),
    },
    title: {
      marginBottom: theme.spacing(2),
    },
  })
);

interface Props {}

export const HomePage: React.FC<Props> = () => {
  const classes = useStyles();

  return (
    <Container className={classes.root}>
      <Grid container spacing={2}>
        <LeftPanel />
        <RightPanel />
      </Grid>
    </Container>
  );
};
