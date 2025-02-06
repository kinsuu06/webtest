import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from 'cors';

dotenv.config(); // Load environment variables BEFORE using them

import userRoutes from './routes/auth.js';
import router from "./routes/note.js";
const app = express();

app.use(cors());
app.use(express.json());
app.use(userRoutes);
app.use(router);
const PORT = 8000;
const mongoURI = process.env.MONGO_URI;

if (!mongoURI) {
  console.error("MONGO_URI is not defined. Check your .env file.");
  process.exit(1); // Exit process if MongoDB URI is missing
}

mongoose.connect(mongoURI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
    console.log("Connected to MongoDB successfully.");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
  });

export default app;
