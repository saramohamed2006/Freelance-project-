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



  export const searchGigs = async (req:Request,res:Response): Promise<void> {

    const {title, category, minPrice, maxPrice, freeLancerName} = req.query;
    const filter:any = {};

    if(title){
        filter.title = title;
    }
    if(category){
        filter.category = category;
    }

    const priceFilter:any = {};

    if(minPrice) {
        priceFilter.$gte = Number(minPrice);
    }

    if(maxPrice) {
        priceFilter.$lte = Number(maxPrice)
    }
    if(minPrice || maxPrice) {
        filter.price = priceFilter;
    }

    if(freeLancerName) { 
        const freeLancer = await user.findOne({
            fullName: freeLancerName
        });

        if (!freeLancer) {
            res.status(404).json({
                message: "freelancer doesnt exist"
            }); return;
        }
            filter.owner = freeLancer._id;
    }

    const gigs = await Gigs.find(filter);
    res.status(200).json(gigs);

  };
