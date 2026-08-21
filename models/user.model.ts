import mongoose from "mongoose";
import { Document,Schema } from "mongoose";

//SCHEMA:

/**
 * @swagger
 * components:
 *   schemas:
 *     user:
 *       type: object
 *       required:
 *         - fullName
 *         - password
 *         - email
 *         - role
 *       properties:
 *         fullName:
 *           type: String
 *           description: fullname of user
 *         password:
 *           type: string
 *           description: password of user
 *         role:
 *           type: string
 *           enum:
 *            - freelancer
 *            - client
 *           description: role of user must be a freelancer or client
 *         email:
 *           type: string
 *           description: email of user
 *         
 *       example:
 *         fullName: "sara mohamed"
 *         password: "shsdgw8238ydedh"
 *         email: "sara@gmail.com"
 *         role: "freelancer"
 *       
 */

const userSchema=new mongoose.Schema({
fullName:{
    type:String,
    required:true,
},
email: {
    type:String,
    required:true,
    unique:true
},
password:{
    type:String,
    required:true,
    select :false
},
role:{
    type:String,
    required:true,
    enum : ["freelancer", "client"]
}},
 {timestamps :true})


export const user=mongoose.model("user",userSchema);