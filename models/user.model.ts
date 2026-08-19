import mongoose from "mongoose";
import { Document,Schema } from "mongoose";
const userSchema=new mongoose.Schema({
fullName:{
    type:String,
    required:true,
},
email : {
    type:String,
    required:true,
    unique:true
},
password:{
    type:String,
    required:true,
    select :false
},
role :{
    type:String,
    required:true,
    enum : ["freelancer", "client"]
}},
 {timestamps :true})


export const user=mongoose.model("user",userSchema);