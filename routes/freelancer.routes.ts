import { Router } from "express";
import {createGigs,updateGigs,deleteGig,updateOrderStatus} from "../controllers/freelancer.controlls"
import { searchGigs } from "../controllers/freelancer.controlls";
import{authenticate} from "../middlewares/auth.middlewares";
import {authorize} from "../middlewares/authorization.middlewares";
import { SignIn,signup ,SignOut} from "../controllers/user.controler";
import { validateGig} from "../middlewares/validation.middleware";
export const router = Router();
/**
 * @swagger
 * tags:
 *   name: Gigs
 *   description: Gigs management endpoints
 */
/**
 * @swagger
 * /gigs:
 *   post:
 *     tags: 
 *       - Gigs
 *     summary: Create a new gig
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Gigs'
 *     responses:
 *       201:
 *         description: Gig created successfully
 *         content: 
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Gigs'
 *       400:
 *         description: Failed to create gig
 *       500:
 *         description: Some server error!
 */
 
router.post('/',authenticate,authorize("freelancer"),validateGig,createGigs)




/**
 * @swagger
 * /gigs/:id:
 *   put:
 *     tags: 
 *       - Gigs
 *     summary: Update an existing gig
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The gig id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Gig'
 *     responses:
 *       200:
 *         description: Gig Updated successfully
 *       403:
 *         description: You are not allowed to update !
 *       404:
 *         description: Not found !
 *       500:
 *         description: Some server error!
 */
  router.put('/:id',authenticate,authorize("freelancer"),validateGig,updateGigs);

/**
 * @swagger
 * /gigs/:id:
 *   delete:
 *     tags: 
 *       - Gigs
 *     summary: Delete a gig by id
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The gig id
 *     responses:
 *       200:
 *         description: Gig deleted successfully
 *       400:
 *         description: Cannot delete gig because it has pending or accepted orders
 *       403:
 *         description: You are not allowed to update !
 *       404:
 *         description: Not found !
 *       500:
 *         description: Some server error!
 */


router.delete('/:id',authenticate,authorize("freelancer"),deleteGig);
/**
 * @swagger
 * /orders/:id/status:
 *   patch:
 *     tags:
 *       - Orders
 *     summary: update order status
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: the id of the order
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 description: the new status of the order
 *                 enum:
 *                   - pending
 *                   - accepted
 *                   - completed
 *     responses:
 *       200:
 *         description: order status updated 
 *       400:
 *         description: invalid status or user is not allowed to update order
 *       404:
 *         description: order or gig not found
 *       500:
 *         description: Some server error!
 */

 router.patch("/:id/status",authenticate,updateOrderStatus);
 /**
 * @swagger
 * /gig/search:
 *   get:
 *     tags:
 *       - Gigs
 *     summary: search and filter gigs
 *     parameters:
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         required: false
 *         description: the title of gig
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         required: false
 *         description: the category of gig
 *       - in: query
 *         name: minPrice
 *         schema:
 *           type: number
 *         required: false
 *         description: the minimum price of the gig
 *       - in: query
 *         name: maxPrice
 *         schema:
 *           type: number
 *         required: false
 *         description: the maximum price of the gig
 *       - in: query
 *         name: freeLancerName
 *         schema:
 *           type: string
 *         required: false
 *         description: the name of the freelancer
 *     responses:
 *       200:
 *         description: gigs displayed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       404:
 *         description: freelancer doesnt exist
 *       500:
 *         description: Some server error!
 */

router.get("/search", searchGigs);