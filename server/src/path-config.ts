import { register } from "tsconfig-paths";
import * as path from "path";

register({
  baseUrl: path.join(__dirname, ".."),
  paths: {
    "@controllers": ["src/controllers/*"],
    "@models": ["src/models/*"],
    "@services": ["src/services/*"],
    "@db": ["src/db/*"],
    "@constants": ["src/constants/*"],
    "@middlewares": ["src/middlewares/*"],
    "@utils": ["src/utils/*"],
    "@listeners": ["src/listeners/*"],
    "@typings": ["src/types/*"],
    "@cron-jobs": ["src/cron-jobs/*"],
  },
});
