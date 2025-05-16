import express from "express"
import { signup,login,logout,getUserProfile } from "../controllers/userControlls.js";
import secureRoute from "../middleware/secureRoute.js";
const router = express.Router();
router.post("/signup",signup)
router.post("/login",login)
router.post("/logout",logout)
router.get("/alluser",secureRoute,getUserProfile)
export default router;