import { Router } from "express";
export const router_user = Router();
import { SignIn,signup ,SignOut} from "../controllers/user.controler";
import { validateSignUp, validateSignIn } from "../middlewares/validation.middleware";

// TAGS:

/**
 * @swagger
 * tags:
 *   name: user
 *   description: user APIs
 */


// routes template:

/**
 * @swagger
 * /user/signup:
 *   post:
 *     tags: 
 *     - user
 *     summary: create account for user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/user'
 *     responses:
 *       201:
 *         description: sign up successfully
 *         content: 
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/user'
 *       400:
 *         description: invaild data or user does not exist 
 *       500:
 *         description: Some server error!
 */
router_user.post('/signup',validateSignUp,signup);

/**
 * @swagger
 * /user/signIN:
 *   post:
 *     tags: 
 *     - user
 *     summary: Authenticates a registered user and generates an access token  
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/user'
 *     responses:
 *       200:
 *         description: 
 *         content: 
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/user'
 *       400:
 *         description: Invaild Data
 *       500:
 *         description: Some server error!
 */
router_user.post('/signIN',validateSignIn,SignIn);

/**
 * @swagger
 * /user/signOut:
 *   get:
 *     tags:
 *     - user
 *     summary: Sign out the current user
 *    
 *     responses:
 *       200:
 *         description: logged out succssfully
 *         content: 
 *           application/json:
 *             schema:
 *               $ref: #/components/schemas/user'
 *       404:
 *         description: Invaild Action
 *       500:
 *         description: Some server error!*/

router_user.get('/signOut',SignOut);
