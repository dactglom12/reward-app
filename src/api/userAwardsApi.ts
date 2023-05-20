import { baseAxiosClient } from ".";

interface GrantAwardParams {
  awardId: string;
  price: number;
}

const subroute = "/user-awards";

class UserAwardsApi {
  static async grantAward({ awardId, price }: GrantAwardParams) {
    return baseAxiosClient.post(`${subroute}/grant`, { awardId, price });
  }
}

export { UserAwardsApi };
