import mongoose from "mongoose";
import { Document,Schema } from "mongoose";


/**
 * @swagger
 * components:
 *   schemas:
 *     orders:
 *       type: object
 *       required:
 *         - GigReferance
 *         - client
 *         - status
 *       properties:
 *         GigReferance:
 *           type: string
 *           description: id of gig
 *         client:
 *           type: string
 *           description: id of client
 *         status:
 *           type: string
 *           enum:
 *             - pending
 *             - accepted
 *             - completed
 *           description: status of the order
 *       
 *         
 *       example:
 *         GigReferance: "3huh383u34u"
 *         client: "sh238ydedh"
 *         status: "pending"
 *         
 *       
 */
const orderSchema=new mongoose.Schema({
GigReferance :{
    type : Schema.ObjectId,
    ref : 'Gigs'
},
client : {
     type : Schema.ObjectId,
    ref : 'user'
},

    status : {
         type:String,
    required:true,
    enum : ["pending","accepted","completed"],
    default : "pending"
    }
},{timestamps :true})
export const order=mongoose.model("order",orderSchema)