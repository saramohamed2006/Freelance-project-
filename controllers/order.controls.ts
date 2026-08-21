import {Request,Response} from "express";
import { ordersschemas } from "../models/order.model";
import { Gigs } from "../models/gigs.model";


export const createOrder = async ( req:Request, res:Response ): Promise<void> => {

    const {GigReferance} = req.body;
    const gig = await Gigs.findById(GigReferance);

    if(!gig) {
        res.status(404).json({
            message: "gig not found"
        }); return;
    }

    const clientId = req.user.id;

    if(clientId === gig.owner.toString()) {
        res.status(400).json({
            message: "you cant order your own gig"
        }); return;
    }

    const order = await ordersschemas.create({
        GigReferance: GigReferance,
        client: clientId
    });
    res.status(200).json(order)
};

//not done yet need the clientid from auth middleware to first check if an order was made by a user
//second if it wasn't then we create the order successfully 

export const getMyOrders = async (req:Request, res:Response): Promise<void> => {
    const clientId = req.user.id;
    const orders = await ordersschemas.find({client: clientId});
    res.status(200).json(orders);


};


export const getOrderById = async (req:Request, res:Response): Promise<void> => {
    const id = req.params.id;
    const order = await ordersschemas.findById(id);

    if (!order) {
        res.status(404).json({
            message: "order doesnt exist"
        }); return;
    }

    const gig = await Gigs.findById(order.GigReferance);
    if (!gig) {
        res.status(404).json({
            message: "gig doesnt exist"
        }); return;
    }


    if(order.client.toString() !== req.user.id && gig.owner.toString() !== req.user.id) {
        res.status(400).json({
            message: "you can only view your own order"
        }); return;
    }
    res.status(200).json(order);
};

export const updateOrderStatus = async (req:Request,res:Response): Promise<void> => {
    const id = req.params.id;
    const order = await ordersschemas.findById(id);
    const {status} = req.body;

    if(!order) {
        res.status(404).json({
            message: "order doesnt exist"
        }); return;
    };

    if(req.user.role !== "freelancer") {
        res.status(400).json({
         message:   "only a freelancer can update an order status"
        }); return;
    }


     if((status !== "pending" && status!== "accepted" && status !== "completed")) {
        res.status(400).json({
            message: "invalid status"
        }); return;
     };
    

    if((order.status == "pending" && status !== "accepted") ||
     (order.status == "accepted" && status !== "completed") ||
     (order.status == "completed")) {
        res.status(400).json({
            message: "invalid status order"
        }); return;
     };
     const gig = await Gigs.findById(order.GigReferance);

     if (!gig) {
        res.status(404).json({
            message: "gig doesnt exist"
        }); return;
     }

     if (gig.owner.toString() !== req.user.id) {
        res.status(400).json({
            message: "you are not allowed to update orders"
        }); return;
     }

     order.status = status;
     await order.save();
     res.status(200).json(order);

     
};

export const cancelOrder = async (req:Request,res:Response): Promise<void> => {
    const id = req.params.id;
    const order = await ordersschemas.findById(id);

    if(!order) {
        res.status(404).json({
            message: "order doesnt exist"
        }); return;
    }

    if(order.status == "completed") {
        res.status(400).json({
            message: "request rejected"
        }); return;
    }

    if(order.client.toString() !== req.user.id) {
        res.status(400).json({
            message: "only client can cancel"
        }); return;
     }

     if(order.status == "pending" || order.status == "accepted") {
        await ordersschemas.findByIdAndDelete(id);
        res.status(200).json({
            message: "order cancelled successfully"
        }); return;
     }

     

     //still need auth
}