import { Request,Response } from "express";
import {user}from "../models/user.model";
import {Gigs} from "../models/gigs.model";
import{authenticate} from "../middlewares/auth.middlewares"
 export const createGigs =async(req:Request,res:Response)=>{
    try {
        const { title,description,price,category}= req.body;
 const creategigs= await Gigs.create( {
title,
description,
price,
category,
owner : req.user.id
 })
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
 
