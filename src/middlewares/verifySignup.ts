import { Request, Response, NextFunction } from "express";
import { Roles } from "../models/Role";
import User from "../models/User";

export const checkRolesExisted = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { roles } = req.body;

	if (roles) {
		for (let role of roles) {
			if (!Object.values(Roles).includes(role)) {
				return res.status(400).json({
					message: `Role ${role} does not exists`,
				});
			}
		}
	}

	next();
};

export const checkDuplicateUsernameOrEmail = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { username, email } = req.body;

	const userFound = await User.findOne({ username });

	if (userFound)
		return res.status(400).json({
			message: "The user already exists",
		});

	const emailFound = await User.findOne({ email });

	if (emailFound)
		return res.status(400).json({
			message: "The email already exists",
		});

	next();
};
