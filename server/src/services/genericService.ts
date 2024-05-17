import mongoose from "mongoose";

export abstract class GenericService<T> {
  abstract model: mongoose.Model<T>;

  async getAll() {
    return this.model.find();
  }

  async getById(id: string) {
    return this.model.findById(id);
  }

  async create(doc: T) {
    const document = new this.model(doc);

    return document.save();
  }

  async getAllBy(fields: Partial<T>) {
    return this.model.find({ ...fields });
  }
}
