import { Router } from "express";
import { signup, signin } from "../controllers/auth.controllers";
import { verifySignup } from "../middlewares";

const router = Router();

router.post(
	"/signup",
	[
		verifySignup.checkDuplicateUsernameOrEmail,
		verifySignup.checkRolesExisted,
	],
	signup
);
router.post("/signin", signin);

export default router;
