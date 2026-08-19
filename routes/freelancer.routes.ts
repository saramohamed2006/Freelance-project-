import { Router } from "express";
import {createGigs,createuser} from "../controlls/freelancer.controlls"
export const router = Router();
router.post('/',createGigs);
router.post('/user',createuser);