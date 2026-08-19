import mongoose from "mongoose";
import { Document,Schema } from "mongoose";
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
})
export const ordersschemas=mongoose.model("orders",orderSchema)