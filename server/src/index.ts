import express, { Request, Response, NextFunction } from "express";
import "./path-config";
import { config } from "./env-config";
import { connect } from "@db/connect";
import eventsRouter from "@routes/events";
import authenticationRouter from "@routes/authentication";
import awardsRouter from "@routes/awards";
import balanceRouter from "@routes/balance";
import userAwardsRouter from "@routes/userAwards";
import tasksRouter from "@routes/tasks";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
import { streakCheckJob } from "@cron-jobs/index";
import "@listeners/userListeners";
import { isProdEnv } from "@utils/envUtils";
import https from "https";
import fs from "fs";

const loggerMiddleware = (req: Request, _res: Response, next: NextFunction) => {
  console.log(
    `${req.method} ${req.url} ${
      req.body ? JSON.stringify(req.body) : "No body"
    }`
  );
  next();
};

const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000", "https://www.waterproof-jule.online"],
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Access-Control-Allow-Headers",
      "Access-Control-Allow-Origin",
      "Content-Type",
      "x-access-token",
      "credentials",
      "ACCESS-CONTROL-ALLOW-ORIGIN",
      "Access-Control-Allow-Credentials",
    ],
    credentials: true,
    preflightContinue: true,
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(loggerMiddleware);

app.use("/events", eventsRouter);
app.use("/authentication", authenticationRouter);
app.use("/awards", awardsRouter);
app.use("/balance", balanceRouter);
app.use("/user-awards", userAwardsRouter);
app.use("/tasks", tasksRouter);

streakCheckJob.start();

if (isProdEnv()) {
  console.log("Running in prod env");

  const httpsOptions = {
    key: fs.readFileSync("../private_key.pem"),
    cert: fs.readFileSync("../certificate.pem"),
  };

  const httpsPort = 443;

  const server = https.createServer(httpsOptions, app);

  connect().then(() => {
    server.listen(httpsPort, () => {
      console.log(`App listening at https port`);
    });
  });
} else {
  console.log("Running in dev env");

  connect().then(() => {
    app.listen(config.port, () => {
      console.log(`App listening at http://localhost:${config.port}`);
    });
  });
}
