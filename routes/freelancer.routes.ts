import { Router } from "express";

import {createGigs,createuser} from "../controllers/freelancer.controlls"
import { searchGigs } from "../controllers/freelancer.controlls";
export const router = Router();
router.post('/',createGigs);
router.post('/user',createuser);
router.get("/search", searchGigs);



