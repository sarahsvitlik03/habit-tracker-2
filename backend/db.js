import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

let client;
let db;

export async function getDB() {
  if (!client) {
    client = new MongoClient(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000, // fail fast if cannot connect
    });
    await client.connect();

    // If your URI includes the db name, this picks it up automatically.
    // Otherwise, explicitly set it here:
    db = client.db(process.env.DB_NAME || "habitTracker");
    console.log("Connected to MongoDB Atlas:", db.databaseName);
  }
  return db;
}
