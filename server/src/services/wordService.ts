import { Word, WordModel } from "@models/wordModel";
import { TranslationService } from "./translationService";
import { TextToSpeechService } from "./textToSpeechService";
import { ImageSearchService } from "./imageSearchService";
import { GenericService } from "./genericService";

class WordInnerService extends GenericService<Word> {
  model = WordModel;

  async generateWord(partial: Pick<Word, "native" | "group">) {
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

export const WordService = new WordInnerService();
