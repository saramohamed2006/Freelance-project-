import { Router } from "express";
export const router = Router();
import { SignIn,SingUP } from "../controllers/user.controler";
router.post('/signIN',SignIn);
router.post('/SingUP',SingUP);