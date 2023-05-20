import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "90vh",
    backgroundColor: theme.palette.background.default,
  },
  text: {
    marginTop: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
}));

export const NotFoundPage: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h2" align="center">
        404
      </Typography>
      <Typography variant="h5" align="center" className={classes.text}>
        Oops! We couldn't find the page you're looking for.
      </Typography>
    </div>
  );
};
