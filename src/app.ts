import express from "express";
import cors from "cors";
import helmet from "helmet";

import routes from "./routes";

import {
  sendSuccess,
} from "./helpers/response.helper";

import {
  errorHandler,
} from "./middleware/error.middleware";

const app = express();

app.use(
  helmet()
);

app.use(
  cors({
    origin: true,
  })
);

app.use(
  express.json()
);

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get(
  "/api/health",
  (_req, res) => {
    sendSuccess(
      res,
      200,
      "GoogleDoko API is running."
    );
  }
);

app.use(
  "/api",
  routes
);

app.use(
  errorHandler
);

export default app;