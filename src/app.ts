import express from "express";
import cors from "cors";
import helmet from "helmet";
import path from "path";

import routes from "./routes";
import { sendSuccess } from "./helpers/response.helper";
import { errorHandler } from "./middleware/error.middleware";

const app = express();

app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
  })
);

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(express.json({ limit: "10mb" }));

app.use(
  express.urlencoded({
    extended: true,
    limit: "10mb",
  })
);

// Static uploads directory
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.get("/api/health", (_req, res) => {
  sendSuccess(res, 200, "GoogleDoko API is running.", {
    timestamp: new Date().toISOString(),
    status: "healthy",
  });
});

app.use("/api", routes);

app.use(errorHandler);

export default app;
