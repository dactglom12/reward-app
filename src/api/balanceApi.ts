import { AxiosResponse } from "axios";
import { baseAxiosClient } from ".";

const subroute = "/balance";

interface UpdateUserBalanceParams {
  updateSum: number;
}

export class BalanceApi {
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
