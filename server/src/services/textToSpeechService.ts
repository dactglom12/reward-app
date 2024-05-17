import {
  PollyClient,
  SynthesizeSpeechCommand,
  SynthesizeSpeechCommandInput,
} from "@aws-sdk/client-polly";

const client = new PollyClient();

class TextToSpeechService {
  static async generate(text: string) {
    const input: SynthesizeSpeechCommandInput = {
      Text: text,
      OutputFormat: "mp3",
      VoiceId: "Matthew",
      LanguageCode: "en-US",
    };

    const command = new SynthesizeSpeechCommand(input);

    const response = await client.send(command);

    const byteArray = await response.AudioStream?.transformToByteArray();

    if (!byteArray) throw new Error("TTS generation failed");

    return Buffer.from(byteArray).toString("base64");
  }
}

export { TextToSpeechService };
