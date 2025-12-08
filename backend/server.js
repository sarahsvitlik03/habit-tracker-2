// Import core dependencies
import express from "express";   // Web framework for building API routes
import cors from "cors";        // Enables cross-origin requests (Vue → Express)
import { getDB } from "./db.js"; // Custom function to connect to MongoDB Atlas
import dotenv from "dotenv";     // Loads environment variables from .env
import { ObjectId } from "mongodb";

// Load environment variables (PORT, MONGO_URI, etc.)
dotenv.config();
const app = express();

const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Health check route (optional)
// Used to confirm the backend is running
app.get("/", (req, res) => {
  res.send("API is running!");
});



app.get("/api/chores", async (req, res) => {
  try {
    // Connect to MongoDB (cached connection in db.js)
    const db = await getDB();

    // Fetch all documents from the "Books" collection
    const items = await db.collection("chores").find().toArray();

    // Send JSON response back to frontend
    res.json(items);
  } catch (err) {
    // Log errors to backend console
    console.error("Error fetching items:", err);

    // Send generic error to frontend
    res.status(500).json({ error: "Internal server error" });
  }
});

// POST a new chore
app.post("/api/chores", async (req, res) => {
  try {
    const db = await getDB();
    const result = await db.collection("chores").insertOne(req.body);
    res.json({ ...req.body, _id: result.insertedId });
  } catch (err) {
    console.error("Error inserting chore:", err);
    res.status(500).json({ error: "Failed to insert chore" });
  }
});


app.put("/api/chores/:id", async (req, res) => {
  try {
    const db = await getDB();
    const { id } = req.params;

    // Strip _id from body to avoid immutable field error
    const { _id, ...rest } = req.body;

    const result = await db.collection("chores").findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: rest },
      { returnDocument: "after" }
    );

    if (!result.value) {
      return res.status(404).json({ error: "Chore not found" });
    }

    res.json(result.value);
  } catch (err) {
    console.error("Error updating chore:", err);
    res.status(500).json({ error: "Failed to update chore" });
  }
});

 

// ----------------------
// Start the Server
// ----------------------

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
