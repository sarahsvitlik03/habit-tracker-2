import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const client = new MongoClient(process.env.MONGO_URI);
let db;

export async function connectDB() {
  await client.connect();
  db = client.db("habittracker");
  console.log("Connected to MongoDB Atlas");
}

export function getDB() {
  return db;
}
