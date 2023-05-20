import { AxiosResponse } from "axios";
import { baseAxiosClient } from ".";

const subroute = "/balance";

interface UpdateUserBalanceParams {
  updateSum: number;
}

class BalanceApi {
  static async getUserBalance(): Promise<
    AxiosResponse<{ balance: { balance: number } }>
  > {
    return baseAxiosClient.get(`${subroute}`);
  }

  static async updateUserBalance({
    updateSum,
  }: UpdateUserBalanceParams): Promise<AxiosResponse<{ balance: number }>> {
    return baseAxiosClient.post(`${subroute}/update`, { updateSum });
  }
}

export { BalanceApi };
