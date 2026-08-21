import "dotenv/config";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import express, { Router } from "express";
import { connectDB } from "./config/db.js";
import {router} from "./routes/freelancer.routes.js"

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/gig",router);
connectDB();
  app.listen(port, () => {
    console.log(`Server is sailing at http://localhost:${port}`);
  });
