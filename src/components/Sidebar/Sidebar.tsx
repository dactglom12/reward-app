import React from "react";
// import { useTheme } from "@mui/material/styles";
import Drawer from "@mui/material/Drawer";
import { WithOpenClosedState } from "@typings/shared";
import { Grid, IconButton, useMediaQuery, useTheme } from "@mui/material";
import { menuSpecificRoutes } from "@routes/constants";
import {
  Avatar,
  LinkGroupsContainer,
  UserBalanceContainer,
  UserEmail,
  UserInfoContainer,
  UserTitle,
} from "./Sidebar.styles";
import { RouteConfig } from "@routes/renderRoutes";
import { LinkGroupIds } from "./types";
import { LinkGroup } from "./LinkGroup";
import { ExitToApp } from "@mui/icons-material";
import { AuthenticationContext } from "@contexts/AuthenticationContext";
import { UserBalanceBadge } from "@components/UserBalanceBadge";
import { Colors } from "constants/styles";
import CloseIcon from "@mui/icons-material/Close";

interface Props extends WithOpenClosedState {}

const groups: Record<
  string,
  { title: string; subtitle: string; links: RouteConfig[] }
> = {
  [LinkGroupIds.HOME]: {
    title: "Dashboards",
    subtitle: "Unique dashboard designs",
    links: [],
  },
};

const generateRouteGroups = (routes: RouteConfig[]) => {
  const groupsHash = { ...groups };

  routes.forEach((route) => {
    if (!route.groupId || !groupsHash[route.groupId]) return;

    groupsHash[route.groupId].links.push(route);
  });

  return groupsHash;
};

const routeGroups = generateRouteGroups(menuSpecificRoutes);

export const Sidebar: React.FC<Props> = ({ isOpen, onClose }) => {
  const { breakpoints, spacing } = useTheme();
  const isMobile = useMediaQuery(breakpoints.down("sm"));
  const { logout } = React.useContext(AuthenticationContext);

  return (
    <Drawer
      open={isOpen}
      onClose={onClose}
      variant="persistent"
      anchor="left"
      PaperProps={{
        sx: (theme) => ({
          width: "280px",
          [theme.breakpoints.down("sm")]: {
            width: "100%",
          },
          background: Colors.DARK_BLUE,
        }),
      }}
    >
      {isMobile && (
        <IconButton
          sx={{
            position: "absolute",
            top: spacing(1),
            right: spacing(1),
            color: Colors.GREY,
          }}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      )}
      <Grid container>
        <UserInfoContainer item xs={12}>
          <Avatar>TBD</Avatar>
          <UserTitle mt={2}>Name Surname</UserTitle>
          <UserEmail>example@gmail.com</UserEmail>
          <UserBalanceContainer>
            <UserBalanceBadge />
          </UserBalanceContainer>
        </UserInfoContainer>
        <LinkGroupsContainer item xs={12}>
          {Object.values(routeGroups).map((props) => (
            <LinkGroup key={props.title} {...props} />
          ))}
          <LinkGroup
            key="buttons-action-group"
            title="Actions"
            buttons={[{ Icon: ExitToApp, label: "Sign out", onClick: logout }]}
          />
        </LinkGroupsContainer>
      </Grid>
    </Drawer>
  );
};
