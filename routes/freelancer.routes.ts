import { Router } from "express";
import {createGigs} from "../controllers/freelancer.controlls"
import { SignIn,signup ,SignOut} from "../controllers/user.controler";
export const router = Router();
router.post('/',createGigs)
