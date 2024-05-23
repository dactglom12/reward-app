import React from "react";
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
} from "./auth.styles";
import { Box } from "@mui/material";
import { Title } from "@components/styled";
import { SubmitHandler, useForm } from "react-hook-form";
import { emailRegexp, passwordRegexp } from "constants/auth";

type LoginFormFields = {
  email: string;
  password: string;
};

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { authenticate, isAuthenticated } = React.useContext(
    AuthenticationContext
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormFields>();

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate(RoutePaths.HOME);
    }
  }, [isAuthenticated, navigate]);

  const onSubmit: SubmitHandler<LoginFormFields> = (values) => {
    AuthApi.login(values)
      .then((_res) => {
        navigate(RoutePaths.HOME);
        authenticate();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <Box padding={2}>
      <Card
        style={{ maxWidth: "460px", width: "100%", boxSizing: "border-box" }}
      >
        <Title>Log in</Title>
        <SubtitleSectionContainer>
          <Subtitle>Don't have an account yet?</Subtitle>
          <SignUpLink to={RoutePaths.SIGN_UP}>Create</SignUpLink>
        </SubtitleSectionContainer>
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputContainer
            {...register("email", { pattern: emailRegexp, required: true })}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            autoComplete="email"
            autoFocus
            error={!!errors.email}
            helperText={!!errors.email ? "Incorrect email format" : undefined}
          />
          <InputContainer
            {...register("password", {
              pattern: passwordRegexp,
              required: true,
            })}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            error={!!errors.password}
            helperText={
              !!errors.password ? "Incorrect password format" : undefined
            }
          />
          <Button type="submit" fullWidth variant="contained" color="primary">
            Log in
          </Button>
        </form>
      </Card>
    </Box>
  );
};
