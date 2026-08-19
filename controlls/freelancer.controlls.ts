import { Request,Response } from "express";
import {user}from "../models/user.model";
import {Gigs} from "../models/gigs.model";
// this function will modified in future after biuld part authentication
 export const createGigs =async(req:Request,res:Response)=>{
    try {
 const creategigs= await Gigs.create(req.body)
return res.status(201).json({
    msg : " Gig created successfully",
    creategigs
})
    }

catch (errors){
res.status(400).json({
    error: " failed to create gig ",
    errors
})
}

 }
 // this function to test  function create gig untill build signup and authentication
  export const createuser =async(req:Request,res:Response)=>{
    try {
 const creategigs= await user.create(req.body)
return res.status(201).json({
    msg : " Gig created successfully",
    creategigs
})
    }

catch (errors){
res.status(400).json({
    error: " failed to create gig ",
    errors
})
}
  }
