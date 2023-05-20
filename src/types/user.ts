import { WithDBId, WithTimestamps } from "./shared";

export type User = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
} & WithTimestamps &
  WithDBId;

export type RegisterDto = Pick<
  User,
  "email" | "password" | "firstName" | "lastName"
>;

export type LoginDto = Pick<User, "email" | "password">;
