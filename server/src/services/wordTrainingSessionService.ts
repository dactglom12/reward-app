import {
  WordTrainingSession,
  WordTrainingSessionModel,
} from "@models/wordTrainingSession";
import { GenericService } from "./genericService";

class WordTrainingSessionInnerService extends GenericService<WordTrainingSession> {
  model = WordTrainingSessionModel;

  async getAllByGroupIdAndUserId(groupId: string, userId: string) {
    return WordTrainingSessionModel.find({ "group._id": groupId, userId });
  }
}

export const WordTrainingSessionService = new WordTrainingSessionInnerService();
