import express from "express";
import cors from "cors";
import { connectDB, getDB } from "./db.js";

const app = express();
app.use(cors());
app.use(express.json());

await connectDB();

// GET all chores
app.get("/api/chores", async (req, res) => {
  try {
    const chores = await getDB().collection("chores").find().toArray();
    res.json(chores);
  } catch (err) {
    console.error("Error fetching chores:", err);
    res.status(500).json({ error: "Failed to fetch chores" });
  }
});

// Add POST route for new chore

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));