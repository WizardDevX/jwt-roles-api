import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import config from "../config";
import User from "../models/User";
import Role from "../models/Role";

export const verifyToken = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const token = req.headers["x-access-token"];

		if (!token)
			return res.status(403).json({ message: "No token provided" });

		const decoded = jwt.verify(token, config.SECRET_KEY);

		req.userId = decoded.id;

		const user = await User.findById(req.userId, { password: 0 });

		if (!user) return res.status(404).json({ message: "No user found" });
	} catch (err) {
		return res.status(401).json({ message: "Unauthorized" });
	}

	next();
};

export const isModerator = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const user = await User.findById(req.userId);
	const roles = await Role.find({ _id: { $in: user!.roles } });

	for (let role of roles) {
		if (role.name === "moderator") {
			next();
			return;
		}
	}

	return res.status(403).json({ message: "Require a Moderator role" });
};

export const isAdmin = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const user = await User.findById(req.userId);
	const roles = await Role.find({ _id: { $in: user!.roles } });

	for (let role of roles) {
		if (role.name === "admin") {
			next();
			return;
		}
	}

	return res.status(403).json({ message: "Require a Admin role" });
};
