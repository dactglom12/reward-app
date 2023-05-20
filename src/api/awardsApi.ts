import { Award } from "@typings/award";
import { AxiosResponse } from "axios";
import { baseAxiosClient } from ".";

const subroute = "/awards";

class AwardsApi {
  static async getAwards(): Promise<AxiosResponse<{ awards: Award[] }>> {
    return baseAxiosClient.get(`${subroute}`);
  }
}

export { AwardsApi };
