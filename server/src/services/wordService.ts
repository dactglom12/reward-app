import { Word, WordModel } from "@models/wordModel";
import { TranslationService } from "./translationService";
import { TextToSpeechService } from "./textToSpeechService";
import { ImageSearchService } from "./imageSearchService";

class WordService {
  static async getAllWords() {
    return WordModel.find();
  }

  static async getAllWordsByGroup(group: string) {
    return WordModel.find({ group });
  }

  static async create(partial: Pick<Word, "native" | "group">) {
    const translation = await TranslationService.translate(
      partial.native,
      "en",
      "ru"
    );
    const audioUrl = await TextToSpeechService.generate(partial.native);
    const image = await ImageSearchService.search(partial.native);

    const newWord = new WordModel({
      ...partial,
      translation,
      audio: audioUrl,
      image,
    });

    return newWord.save();
  }
}

export { WordService };
