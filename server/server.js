import cors from "cors";
import "dotenv/config.js";
import express from "express";
import logger from "morgan";
import path from "path";
import cookieParser from "cookie-parser";
import multer from "multer";

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

// multer error handler
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    // A Multer error occurred during file upload
    if (err.code === "LIMIT_FILE_SIZE") {
      return res
        .status(400)
        .json({ message: "File size limit(10 mb) exceeded " });
    }
    return res.status(400).json({ message: err.message });
  } else if (err) {
    // An unknown error occurred
    return res.status(500).json({ message: "Internal server error" });
  }
  next(); // Pass control to the next middleware
});
