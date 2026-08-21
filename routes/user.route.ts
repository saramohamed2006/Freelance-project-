import { Router } from "express";
export const router_user = Router();
import { SignIn,signup ,SignOut} from "../controllers/user.controler";
router_user.get("/",()=>{
console.log("test")
})
router_user.post('/signIN',SignIn);
router_user.post('/signup',signup);
router_user.get('/SignOut',SignOut);
