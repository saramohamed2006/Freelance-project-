import {Router} from "express";
export const orderRouter = Router();

import {
    createOrder,
    getMyOrders,
    getOrderById,
    cancelOrder
}
 from "../controllers/order.controls";

 import {authenticate} from "../middlewares/auth.middlewares";


/**
 * @swagger
 * /orders:
 *   post:
 *     tags:
 *       - Orders
 *     summary: create a new order
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - GigReferance
 *             properties:
 *               GigReferance:
 *                 type: string
 *                 description: the id of the gig to order
 *     responses:
 *       200:
 *         description: order created successfully
 *       400:
 *         description: you cannot order your own gig
 *       404:
 *         description: gig not found
 */

 orderRouter.post("/",authenticate,createOrder);


 
/**
 * @swagger
 * /orders/myorders:
 *   get:
 *     tags:
 *       - Orders
 *     summary: get all orders for the client
 *     responses:
 *       200:
 *         description: orders displayed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       500:
 *         description: Some server error!
 */


 orderRouter.get("/myorders", authenticate, getMyOrders);


/**
 * @swagger
 * /orders/{id}:
 *   get:
 *     tags:
 *       - Orders
 *     summary: get an order by id
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: the id of the order
 *     responses:
 *       200:
 *         description: order displayed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       400:
 *         description: you can only view your own order
 *       404:
 *         description: order/gig not found
 *       500:
 *         description: Some server error!
 */

 orderRouter.get("/:id",authenticate,getOrderById);

/**
 * @swagger
 * /orders/{id}:
 *   delete:
 *     tags:
 *       - Orders
 *     summary: cancel an order
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: the id of the order
 *     responses:
 *       200:
 *         description: order cancelled
 *       400:
 *         description: request rejected or only the client can cancel the order
 *       404:
 *         description: order not found
 *       500:
 *         description: Some server error!
 */

 orderRouter.delete("/:id",authenticate,cancelOrder);

 