import { Router } from "express";
import { createUser } from "../controllers/user.controller";
import { authJWT, verifySignup } from "../middlewares";
const router = Router();

router.post(
	"/",
	[authJWT.verifyToken, verifySignup.checkRolesExisted, authJWT.isAdmin],
	createUser
);

export default router;
