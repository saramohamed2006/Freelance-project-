import { Request,Response } from "express";
import {user}from "../models/user.model";
import {Gigs} from "../models/gigs.model";
import{order} from "../models/order.model";
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
export const updateGigs = async ( req : Request,res:Response)=>
 {
 const { id } = req.params;
 const gig = await Gigs.findById(id);
 if(! gig ){
 return res.status(404).json({
 message : " not found !"
})
 
 }
const { title,description,price,category}= req.body;

if( gig.owner.toString() != req.user.id){
 return res.status(403).json({
 message : " you are not allowed to update !"
})
}
if(title != undefined)
   gig.title = title;
if(description != undefined)
   gig.description = description
if(price != undefined)
   gig.price = price
if(category != undefined)
   gig.category = category

await gig.save();

return res.status(200).json({
message : "Gig Updated succssfuly"

})
 }

 export const deleteGig = async (req: Request, res: Response) => {
  
    
     const { id } = req.params;
 const gig = await Gigs.findById(id);
 if(! gig ){
 return res.status(404).json({
 message : " not found !"
})}
 if( gig.owner.toString() != req.user.id){
 return res.status(403).json({
 message : " you are not allowed to update !"
})
 }
    
    
    const activeOrder = await order.findOne({
      gig: req.params.id,
      status: { $in: ["pending", "accepted"] }
    });

    if (activeOrder) {
      return res.status(400).json({
        message: "Cannot delete gig because it has pending or accepted orders"
      });
    }

    
    await Gigs.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      message: "Gig deleted successfully"
    });

 
};



export const updateOrderStatus = async (req: Request, res: Response) => {
   

        const { id } = req.params;

        const { status } = req.body;

        const orders = await order.findById(id);

        if (!orders) {
            return res.status(404).json({message: "Order not found"
            });
        }


        const gig = await Gigs.findById(orders.GigReferance);

        if (!gig) {
            return res.status(404).json({message: "Gig not found"
            });
        }

  if (gig.owner.toString() !== req.user.id) {
       return res.status(403).json({message: "You are not allowed to update this order"
            });
        }

   orders.status = status;

     await orders.save();

   return res.status(200).json({
            message: "Order status updated successfully",
            orders
        });

   

};




 export const searchGigs = async (req:Request,res:Response): Promise<void> => {

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

    if(typeof freeLancerName === "string") { 
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
