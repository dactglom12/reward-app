import { UserModel } from "@models/userModel";

class UserService {
  static async getAllUsers() {
    try {
      const users = await UserModel.find();

      return users;
    } catch (err) {
      throw new Error(`Failed to retrieve all users`);
    }
  }
}

export { UserService };
