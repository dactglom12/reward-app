import { config } from "env-config";
import axios from "axios";

const serviceBaseUrl = "https://google.serper.dev";

export class ImageSearchService {
  static async search(query: string) {
    const response = await axios.post(
      `${serviceBaseUrl}/images`,
      JSON.stringify({
        q: query,
      }),
      {
        headers: {
          "X-API-KEY": config.imageSearch.apiKey,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data.images[0].imageUrl;
  }
}
