import bcrypt from "bcrypt";
import { config } from "env-config";
import jwt, { SignOptions } from "jsonwebtoken";

export const encryptPassword = (password: string, saltRouns = 10) =>
  bcrypt.hash(password, saltRouns);

export const comparePasswords = async (
  password: string,
  encryptedPassword: string
) => bcrypt.compare(password, encryptedPassword);

export const generateJwtToken = <T extends Object = {}>(
  data: T,
  options: SignOptions
) => jwt.sign(data, config.tokenSecret, options);

export const verifyJwtToken = (token: string) =>
  jwt.verify(token, config.tokenSecret);
