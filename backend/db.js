import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const client = new MongoClient(process.env.MONGO_URI);
let dbInstance = null;

export async function getDB() {
  // If already connected, reuse the existing connection
  if (dbInstance) return dbInstance;

  try {
    // Open a connection to MongoDB Atlas
    await client.connect();
    console.log("Connected to MongoDB Atlas");

    /**
     * Choose the database name:
     * - Prefer DB_NAME from .env
     * - Otherwise default to "Library"
     */
    dbInstance = client.db(process.env.DB_NAME || "chores");

    // Return the connected database object
    return dbInstance;
  } catch (err) {
    // Log the actual error for debugging
    console.error("MongoDB connection error:", err);

    // Throw error so that Express routes can handle it properly
    throw err;
  }
}
