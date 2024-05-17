import {
  TranslateClient,
  TranslateTextCommand,
  TranslateTextCommandInput,
} from "@aws-sdk/client-translate";

const client = new TranslateClient();

class TranslationService {
  static async translate(
    text: string,
    fromLanguage: string,
    toLanguage: string
  ) {
    const input: TranslateTextCommandInput = {
      Text: text,
      SourceLanguageCode: fromLanguage,
      TargetLanguageCode: toLanguage,
    };
    const command = new TranslateTextCommand(input);

    const response = await client.send(command);

    return response.TranslatedText;
  }
}

export { TranslationService };
