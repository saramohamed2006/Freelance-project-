import {Request,Response} from "express";
import { order } from "../models/order.model";
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

    const orders = await order.create({
        GigReferance: GigReferance,
        client: clientId
    });
    res.status(200).json(orders)
};



export const getMyOrders = async (req:Request, res:Response): Promise<void> => {
    const clientId = req.user.id;
    const orders = await order.find({client: clientId});
    res.status(200).json(orders);


};


export const getOrderById = async (req:Request, res:Response): Promise<void> => {
    const id = req.params.id;
    const orders = await order.findById(id);

    if (!orders) {
        res.status(404).json({
            message: "order doesnt exist"
        }); return;
    }

    const gig = await Gigs.findById(orders.GigReferance);
    if (!gig) {
        res.status(404).json({
            message: "gig doesnt exist"
        }); return;
    }

    if(!orders.client) {
        res.status(400).json({
            message: "order has no client"
        }); return;
    }


    if(orders.client.toString() !== req.user.id && gig.owner.toString() !== req.user.id) {
        res.status(400).json({
            message: "you can only view your own order"
        }); return;
    }
    res.status(200).json(orders);
};

export const cancelOrder = async (req:Request,res:Response): Promise<void> => {
    const id = req.params.id;
    const orders = await order.findById(id);

    if(!orders) {
        res.status(404).json({
            message: "order doesnt exist"
        }); return;
    }

    if(orders.status == "completed") {
        res.status(400).json({
            message: "request rejected"
        }); return;
    }

    if(!orders.client) {
        res.status(400).json({
            message: "order has no client"
        }); return;
    }

    if(orders.client.toString() !== req.user.id) {
        res.status(400).json({
            message: "only client can cancel"
        }); return;
     }

     if(orders.status == "pending" || orders.status == "accepted") {
        await order.findByIdAndDelete(id);
        res.status(200).json({
            message: "order cancelled successfully"
        }); return;
     }

     

     //still need auth
}