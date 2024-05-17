import { RouteConfig } from "@routes/renderRoutes";
import React from "react";
import {
  ActiveLink,
  Container,
  GroupHeaderContainer,
  GroupSubtitle,
  GroupTitle,
  Link,
  LinkIcon,
  LinkTitle,
} from "./LinkGroup.styles";
import { Link as ReactRouterLink, useLocation } from "react-router-dom";
import { Button, Link as MuiLink } from "@mui/material";

interface LinkGroupButton extends Pick<RouteConfig, "Icon"> {
  label: string;
  onClick: () => void;
}

interface LinkGroupProps {
  title: string;
  subtitle?: string;
  links?: RouteConfig[];
  buttons?: LinkGroupButton[];
}

// TODO: rename to ActionsGroup or something
export const LinkGroup: React.FC<LinkGroupProps> = ({
  links,
  subtitle,
  title,
  buttons,
}) => {
  const location = useLocation();

  return (
    <Container>
      <GroupHeaderContainer>
        <GroupTitle>{title}</GroupTitle>
        {subtitle && <GroupSubtitle>{subtitle}</GroupSubtitle>}
      </GroupHeaderContainer>
      {(links ?? []).map(({ Icon, menuTitle, path }) => {
        const isActive = location.pathname === path;
        const LinkElement: typeof MuiLink = isActive ? ActiveLink : Link;

        return (
          <LinkElement key={path} component={ReactRouterLink} to={path}>
            {Icon && (
              <LinkIcon>
                <Icon />
              </LinkIcon>
            )}
            <LinkTitle as="span">{menuTitle}</LinkTitle>
          </LinkElement>
        );
      })}
      {(buttons ?? []).map(({ Icon, label, onClick }) => (
        <Button variant="contained" onClick={onClick} key={label}>
          {Icon && (
            <LinkIcon
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Icon />
            </LinkIcon>
          )}
          <LinkTitle as="span">{label}</LinkTitle>
        </Button>
      ))}
    </Container>
  );
};
