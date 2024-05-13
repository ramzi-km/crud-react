import cors from "cors";
import "dotenv/config.js";
import express from "express";
import logger from "morgan";
import path from "path";
import cookieParser from "cookie-parser";

import { connectToDb } from "./config/db.connection.js";

import employeeMasterRoute from "./routes/employeeMasterRouter.js";
import employeeRoute from "./routes/employeeRouter.js";

const app = express();
const PORT = process.env.PORT || 8000;

// connect to database
connectToDb();

//middlewares
app.use(express.urlencoded({ extended: true }));
app.use(logger("dev"));
app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));
app.use(express.static(path.join(path.resolve(), "public")));
app.use(cors({ origin: [process.env.CLIENT_URL], credentials: true }));

//listening
app.listen(PORT, () => {
  console.log(`server started at  http://localhost:${PORT}`);
});

//route setup
app.use("/", employeeRoute);
app.use("/employeeMaster", employeeMasterRoute);
