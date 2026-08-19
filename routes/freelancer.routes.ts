import { Router } from "express";
import {createGigs,createuser} from "../controllers/freelancer.controlls"
export const router = Router();
router.post('/',createGigs);
router.post('/user',createuser);