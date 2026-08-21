import "dotenv/config";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import express from "express";
import { connectDB } from "./config/db.js";
 import {router} from "./routes/freelancer.routes"
import { orderRouter } from "./routes/order.routes.js"

import{router_user} from "./routes/user.route.js" 
import{spec} from "./config/swagger.js"
import swaggerJSDoc from "swagger-jsdoc";
import  swaggerUi  from "swagger-ui-express";



const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
 app.use("/user",router_user)
 app.use("/orders",orderRouter);
app.use("/api-doc",swaggerUi.serve,swaggerUi.setup(spec))
app.use("/gig",router);


connectDB();
  app.listen(port, () => {
    console.log(`Server is sailing at http://localhost:${port}`);
  });
