import mongoose from "mongoose";
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