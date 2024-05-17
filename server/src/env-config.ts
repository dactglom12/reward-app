import * as dotenv from "dotenv";

const env = process.env.NODE_ENV || "development";

dotenv.config({ path: `.env.${env}` });

export const config = {
  db: {
    url: process.env.DB_URL as string,
  },
  port: parseInt(process.env.PORT as string),
  tokenSecret: process.env.TOKEN_SECRET as string,
  reactAppDomain: process.env.REACT_APP_DOMAIN as string,
  translationService: {
    apiKey: process.env.TRANSLATE_API_KEY as string,
  },
  textToSpeech: {
    apiKey: process.env.TEXT_TO_SPEECH_API_KEY as string,
    userId: process.env.TEXT_TO_SPEECH_USER_ID as string,
  },
  imageSearch: {
    apiKey: process.env.IMAGE_SEARCH_API_KEY as string,
  },
};
