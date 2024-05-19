import React, { useState } from "react";
import { Button, TextField, styled, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { RoutePaths } from "@routes/constants";
import { AuthApi } from "@api/authApi";
import { AuthenticationContext } from "@contexts/AuthenticationContext";
import { Card } from "@components/Card";
import {
  SignUpLink,
  Subtitle,
  SubtitleSectionContainer,
} from "@pages/Login/auth.styles";
import { Title } from "@components/styled";

const Form = styled("form")(({ theme }) => ({
  width: "100%", // Fix IE 11 issue.
  marginTop: theme.spacing(1),
}));

const Submit = styled(Button)(({ theme }) => ({
  margin: theme.spacing(3, 0, 2),
}));

export const SignUpPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const navigate = useNavigate();
  const { authenticate } = React.useContext(AuthenticationContext);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Validate email and password fields
    if (!email || !password || !confirmPassword || !firstName || !lastName) {
      alert("Please enter all required fields");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const requestDto = { email, password, firstName, lastName };

    AuthApi.register(requestDto)
      .then(() => {
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
        <Title>Sign up</Title>
        <SubtitleSectionContainer>
          <Subtitle> Already have an account?</Subtitle>
          <SignUpLink to={RoutePaths.LOGIN}>Log in</SignUpLink>
        </SubtitleSectionContainer>
        <Form onSubmit={handleSubmit}>
          <TextField
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
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            id="confirmPassword"
            autoComplete="new-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="firstName"
            label="First Name"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="lastName"
            label="Last Name"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <Submit type="submit" fullWidth variant="contained" color="primary">
            Create account
          </Submit>
        </Form>
      </Card>
    </Box>
  );
};
