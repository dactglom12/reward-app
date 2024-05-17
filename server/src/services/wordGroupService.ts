import { WordGroup, WordGroupModel } from "@models/wordGroupModel";

class WordGroupService {
  static async getAll() {
    return WordGroupModel.find();
  }

  static async create(category: Pick<WordGroup, "title">) {
    return new WordGroupModel({ title: category.title }).save();
  }
}

export { WordGroupService };
