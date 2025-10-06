import express from "express";
import cors from "cors";
import path from "path";
import fs from "fs";
import usersRouter from "./api/users/index.js";
import defaultErrHandler from "./errHandler/index.js";
import { connectDB } from "./db/index.js";   

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use("/accounts", usersRouter);

app.get("/", (req, res) => {
  res.sendFile(path.resolve("./index.html"));
});

app.get("/profile-picture", (req, res) => {
  const image = process.env.IMAGE || "profile-1.jpg";
  const img = fs.readFileSync(`./images/${image}`);
  res.writeHead(200, { "Content-Type": "image/jpg" });
  res.end(img, "binary");
});

app.use(defaultErrHandler);

(async () => {
  try {
    await connectDB();            
    app.listen(port, () => console.info(`Server running at ${port}`)); 
  } catch (err) {
    console.error("Failed to start:", err);
    process.exit(1);
  }
})();