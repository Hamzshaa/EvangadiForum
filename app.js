import express from "express";
import cors from "cors";
import userRoute from "./routes/userRoute.js";
import questionRoute from "./routes/questionRoute.js";
import answerRoute from "./routes/answerRoute.js";
// import { dbConn } from "./db/dbConfig.js";
import mongoose from "mongoose";
import path from "path";

const app = express();

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("mongoDB connected"))
  .catch((e) => console.log("Error connecting mongoDB: ", e.message));

const __dirname = path.resolve();

app.use(cors({ origin: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", userRoute);
app.use("/api/questions", questionRoute);
app.use("/api/answers", answerRoute);

app.use(express.static(path.join(__dirname, "/client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
