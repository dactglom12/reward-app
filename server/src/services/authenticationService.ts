import { User, UserModel } from "@models/userModel";
import {
  comparePasswords,
  encryptPassword,
  generateJwtToken,
} from "utils/authUtils";

interface RegisterParams
  extends Pick<User, "email" | "password" | "firstName" | "lastName"> {}
interface LoginParams extends Pick<User, "email" | "password"> {}

class AuthenticationService {
  static async register({
    email,
    firstName,
    lastName,
    password,
  }: RegisterParams): Promise<User> {
    try {
      const isAlreadyExist = await UserModel.findOne({ email });

      if (isAlreadyExist) {
        throw new Error("User already exists");
      }

      const encryptedPassword = await encryptPassword(password);

      const user = new UserModel({
        email,
        firstName,
        lastName,
        password: encryptedPassword,
      });

      const token = generateJwtToken(
        { userId: user._id, email },
        { expiresIn: "24h" }
      );

      const savedUser = await user.save();

      savedUser.token = token;

      return savedUser;
    } catch (err) {
      console.log(err);
      throw new Error("Error during registration");
    }
  }

  static async login({ email, password }: LoginParams) {
    const user = await UserModel.findOne({ email });

    if (!user) {
      throw new Error("User not found");
    }

    const arePasswordsSame = await comparePasswords(password, user.password);

    if (!arePasswordsSame) {
      throw new Error("Invalid credentials");
    }

    const token = generateJwtToken(
      { userId: user._id, email },
      { expiresIn: "24h" }
    );

    user.token = token;

    return user;
  }
}

export { AuthenticationService };
