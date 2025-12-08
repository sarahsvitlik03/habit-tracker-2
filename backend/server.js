// Import core dependencies
import express from "express";   // Web framework for building API routes
import cors from "cors";        // Enables cross-origin requests (Vue → Express)
import { getDB } from "./db.js"; // Custom function to connect to MongoDB Atlas
import dotenv from "dotenv";     // Loads environment variables from .env
import { ObjectId } from "mongodb"; //Get specific id from mongodb

// Load environment variables (PORT, MONGO_URI, etc.)
dotenv.config();

// Create Express application
const app = express();

// Set fallback port if PORT not found in .env
const PORT = process.env.PORT || 3000;

// Enable CORS so Vue frontend can call this backend
app.use(cors());

// Allows Express to read JSON request bodies (POST, PUT, etc.)
app.use(express.json());

// Serve portfolio at root
app.use("/", express.static("public"));

// health check
app.get("/", (req, res) => {
  res.sendFile("index.html", { root: "public" });
});


//GET all chores -> Connects to MongoDB, fetches chores, sends back JSON to frontend
app.get("/api/chores", async (req, res) => {
  try {
    const db = await getDB();
    const items = await db.collection("chores").find().toArray();
    res.json(items);
  } catch (err) {
    console.error("MongoDB error:", err.message);
    res.status(500).json({ error: err.message });
  }
});


// POST a new chore -> inserts new chore and returns result
app.post("/api/chores", async (req, res) => {
  try {
    const db = await getDB();
    const result = await db.collection("chores").insertOne(req.body);
    res.json(result);
  } catch (err) {
    console.error("Error inserting chore:", err);
    res.status(500).json({ error: "Failed to insert chore" });
  }
});

// PUT chore -> finds chore by id, updates fields in MongoDB, returns update result
app.put("/api/chores/:id", async (req, res) => {
  try {
    const db = await getDB();

    // Make a copy of the body without _id
    const { _id, ...updateFields } = req.body;

    const result = await db.collection("chores").updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: updateFields }
    );

    res.json({ modifiedCount: result.modifiedCount });
  } catch (err) {
    console.error("Error updating chore:", err.message);
    res.status(500).json({ error: "Could not update chore" });
  }
});

// ----------------------
// Start the Server -> Starts express server
// ----------------------

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
