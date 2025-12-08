import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

let client;
let db;

export async function getDB() {
  if (!client) {
    client = new MongoClient(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    await client.connect();
    db = client.db(); // automatically uses the db from URI
    console.log("Connected to MongoDB Atlas:", db.databaseName);
  }
  return db;
}
