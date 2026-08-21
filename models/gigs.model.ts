import mongoose from "mongoose";

/**
 * @swagger
 * components:
 *   schemas:
 *     Gig:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - price
 *         - category
 *         - owner
 *       properties:
 *         title:
 *           type: string
 *           description: title of the gig
 *         description:
 *           type: string
 *           description: description of the gig
 *         price:
 *           type: number
 *           description: price of the gig
 *         category:
 *           type: string
 *           description: category of the gig
 *         owner:
 *           type: string
 *           description: id of the owner user
 * 
 * 
 *       example:
 *        title: "Full Stack Web Development"
 *         description: "I will build a complete web application using Node.js and TypeScript"
 *        price: 150
 *        category: "Programming & Tech"
 *         owner: "64f1a2b3c4d5e6f7a8b9c0d1"
 * 
 */

const GigSchema=new mongoose.Schema({
title :{
 type:String,
    required:true,
},
description :{
 type:String,
    required:true,

},
price :{
 type:Number,
    required:true,
},
category :{
     type:String,
    required:true,
},
owner :{
type: mongoose.Schema.Types.ObjectId,
 ref:'user',
 required : true
}
},{timestamps :true})
export const Gigs=mongoose.model("Gigs",GigSchema);