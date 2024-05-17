import {
  WordTrainingSession,
  WordTrainingSessionModel,
} from "@models/wordTrainingSession";
import { GenericService } from "./genericService";

class WordTrainingSessionInnerService extends GenericService<WordTrainingSession> {
  model = WordTrainingSessionModel;
}

export const WordTrainingSessionService = new WordTrainingSessionInnerService();
