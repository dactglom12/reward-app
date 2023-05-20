import React from "react";
import {
  makeStyles,
  createStyles,
  Theme,
  useTheme,
} from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import { WithOpenClosedState } from "@typings/shared";
import { IconButton, useMediaQuery } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { NavLink } from "react-router-dom";
import { menuSpecificRoutes } from "@routes/constants";

interface Props extends WithOpenClosedState {}

export const Sidebar: React.FC<Props> = ({ isOpen, onClose }) => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Drawer
      open={isOpen}
      onClose={onClose}
      classes={{ paper: classes.drawerPaper }}
    >
      {isMobile && (
        <div className={classes.mobileClose}>
          <IconButton color="inherit" onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </div>
      )}
      <List>
        {menuSpecificRoutes.map(({ Icon, menuTitle, path }) => (
          <ListItem
            onClick={onClose}
            component={NavLink}
            to={path}
            button
            key={path}
          >
            {Icon && (
              <ListItemIcon>
                <Icon />
              </ListItemIcon>
            )}
            <ListItemText primary={menuTitle} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawerPaper: {
      width: "250px",
      [theme.breakpoints.down("sm")]: {
        width: "100%",
      },
    },
    mobileClose: {
      position: "absolute",
      top: 0,
      right: 0,
      padding: theme.spacing(1),
      zIndex: theme.zIndex.modal + 1,
    },
  })
);
