import { Router } from "express";
import {createGigs} from "../controllers/freelancer.controlls"
export const router = Router();
router.post('/',createGigs);
