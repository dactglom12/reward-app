import { RegisterDto, LoginDto } from "@typings/user";
import { baseAxiosClient } from ".";

const subroute = "/authentication";

class AuthApi {
  static async register(dto: RegisterDto) {
    return baseAxiosClient.post(`${subroute}/register`, dto);
  }

  static async login(dto: LoginDto) {
    return baseAxiosClient.post(`${subroute}/login`, dto);
  }

  static async checkAuthentication() {
    return baseAxiosClient.post(`${subroute}/me`);
  }

  static async logout() {
    return baseAxiosClient.post(`${subroute}/logout`);
  }
}

export { AuthApi };
