import mongoose, { ConnectOptions } from "mongoose";
import { config } from "../env-config";

const mongooseOptions: ConnectOptions = {};

export const connect = () => {
  return mongoose.connect(config.db.url, mongooseOptions);
};
