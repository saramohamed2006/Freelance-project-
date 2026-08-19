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
 ref:'user'
}
})
export const Gigschema=mongoose.model("Gigs",GigSchema);