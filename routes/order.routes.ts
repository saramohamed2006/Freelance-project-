import {Router} from "express";
export const orderRouter = Router();

import {
    createOrder,
    getMyOrders,
    getOrderById,
    updateOrderStatus,
    cancelOrder
}
 from "../controllers/order.controls";

 import {authenticate} from "../middlewares/auth.middlewares";

 orderRouter.post("/",authenticate,createOrder);

 orderRouter.get("/myorders", authenticate, getMyOrders);

 orderRouter.get("/:id",authenticate,getOrderById);

 orderRouter.patch("/:id/status",authenticate,updateOrderStatus);

 orderRouter.delete("/:id",authenticate,cancelOrder);

 