import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RoutePaths } from "@routes/constants";
import { AuthApi } from "@api/authApi";
import { AuthenticationContext } from "@contexts/AuthenticationContext";
import { Card } from "@components/Card";
import {
  Button,
  InputContainer,
  SignUpLink,
  Subtitle,
  SubtitleSectionContainer,
  Title,
} from "./auth.styles";
import { Box } from "@mui/material";

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { authenticate, isAuthenticated } = React.useContext(
    AuthenticationContext
  );

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate(RoutePaths.HOME);
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Validate email and password fields
    if (!email || !password) {
      alert("Please enter both email and password");
      return;
    }

    const requestDto = { email, password };

    AuthApi.login(requestDto)
      .then((res) => {
        console.log(res);
        navigate(RoutePaths.HOME);
        authenticate();
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <Box padding={2}>
      <Card
        style={{ maxWidth: "460px", width: "100%", boxSizing: "border-box" }}
      >
        <Title>Sign in</Title>
        <SubtitleSectionContainer>
          <Subtitle>Don't have an account yet?</Subtitle>
          <SignUpLink to={RoutePaths.SIGN_UP}>Create</SignUpLink>
        </SubtitleSectionContainer>
        <form onSubmit={handleSubmit}>
          <InputContainer
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputContainer
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" fullWidth variant="contained" color="primary">
            Log in
          </Button>
        </form>
      </Card>
    </Box>
  );
};
