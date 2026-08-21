import "dotenv/config";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import express from "express";
import { connectDB } from "./config/db.js";
// import {router} from "./routes/freelancer.routes.ts"
import{router_user} from "./routes/user.route.js" 
console.log(router_user)
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
 app.use("/user",router_user)
connectDB();
  app.listen(port, () => {
    console.log(`Server is sailing at http://localhost:${port}`);
  });
