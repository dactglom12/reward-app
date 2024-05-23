import React from "react";
import {
  Button,
  TextField,
  styled,
  Box,
  Typography,
  useTheme,
} from "@mui/material";
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
import { SubmitHandler, useForm } from "react-hook-form";
import { emailRegexp, passwordRegexp } from "constants/auth";

const Form = styled("form")(({ theme }) => ({
  width: "100%", // Fix IE 11 issue.
  marginTop: theme.spacing(1),
}));

const Submit = styled(Button)(({ theme }) => ({
  margin: theme.spacing(3, 0, 2),
}));

type SignUpFormFields = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

export const SignUpPage: React.FC = () => {
  const navigate = useNavigate();
  const { authenticate } = React.useContext(AuthenticationContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormFields>();
  const { spacing } = useTheme();

  const onSubmit: SubmitHandler<SignUpFormFields> = (fields) => {
    AuthApi.register(fields)
      .then(() => {
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
        <Title>Sign up</Title>
        <SubtitleSectionContainer>
          <Subtitle> Already have an account?</Subtitle>
          <SignUpLink to={RoutePaths.LOGIN}>Log in</SignUpLink>
        </SubtitleSectionContainer>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            {...register("email", { required: true, pattern: emailRegexp })}
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
          <TextField
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
            autoComplete="new-password"
            error={!!errors.password}
            helperText={
              !!errors.password ? "Incorrect password format" : undefined
            }
          />
          <TextField
            {...register("firstName", { required: true, minLength: 3 })}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="First Name"
            id="firstName"
            error={!!errors.firstName}
            helperText={
              !!errors.firstName
                ? "Must be minimum 3 characters long"
                : undefined
            }
          />
          <TextField
            {...register("lastName", { required: true, minLength: 3 })}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Last Name"
            id="lastName"
            error={!!errors.lastName}
            helperText={
              !!errors.lastName
                ? "Must be minimum 3 characters long"
                : undefined
            }
          />
          <ul style={{ paddingLeft: spacing(3) }}>
            <li>
              <Typography fontStyle="italic">
                Password must be at least 8 characters long
              </Typography>
            </li>
            <li>
              <Typography fontStyle="italic">
                Password must have at least one uppercase letter
              </Typography>
            </li>
            <li>
              <Typography fontStyle="italic">
                Password must have at least one lowercase letter
              </Typography>
            </li>
            <li>
              <Typography fontStyle="italic">
                Password must have at least one number
              </Typography>
            </li>
          </ul>
          <Submit type="submit" fullWidth variant="contained" color="primary">
            Create account
          </Submit>
        </Form>
      </Card>
    </Box>
  );
};
