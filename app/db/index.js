import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const {
  MONGO_USER,
  MONGO_PASS,
  MONGO_HOST,
  MONGO_PORT,
  MONGO_DB = "user-account",
  MONGO_AUTHSOURCE = "admin",
} = process.env;

const mongoUrl =
  `mongodb://${encodeURIComponent(MONGO_USER)}:${encodeURIComponent(MONGO_PASS)}` +
  `@${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}?authSource=${MONGO_AUTHSOURCE}`;


export async function connectDB() {
  await mongoose.connect(mongoUrl, { serverSelectionTimeoutMS: 5000 });

  const db = mongoose.connection;
 
  db.on("error", (err) => {
    console.log(`database connection error: ${err}`);
  });
  db.on("disconnected", () => {
    console.log("database disconnected");
  });
  db.once("open", () => {
    console.log(`database connected to ${db.name} on ${db.host}`);
  });
}