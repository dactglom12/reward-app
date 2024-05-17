import {
  WordTrainingSession,
  WordTrainingSessionModel,
} from "@models/wordTrainingSession";
import { GenericService } from "./genericService";

class WordTrainingSessionInnerService extends GenericService<WordTrainingSession> {
  model = WordTrainingSessionModel;

  async getAllByGroupId(groupId: string) {
    return WordTrainingSessionModel.find({ "group._id": groupId });
  }
}

export const WordTrainingSessionService = new WordTrainingSessionInnerService();
