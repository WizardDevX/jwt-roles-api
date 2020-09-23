import Role from "../models/Role";
import User from "../models/User";
import jwt from "jsonwebtoken";
import config from "../config";
import fs from "fs";
import Product from "../models/Product";

export const seedDatabase = async () => {
	try {
		const countedRoles = await Role.estimatedDocumentCount();
		const countedUsers = await User.estimatedDocumentCount();
		const countedProducts = await Product.estimatedDocumentCount();

		if (countedRoles > 0 && countedUsers > 0 && countedProducts > 0) return;

		const roles = await Promise.all([
			new Role({ name: "user" }).save(),
			new Role({ name: "admin" }).save(),
			new Role({ name: "moderator" }).save(),
		]);

		const users = await Promise.all([
			new User({
				username: "usuario",
				email: "usuario@test.com",
				password: "usuario",
				roles: [roles[0]._id],
			}).save(),
			new User({
				username: "admin",
				email: "admin@test.com",
				password: "admin",
				roles: [roles[1]._id, roles[2]._id],
			}).save(),
		]);

		const productId = await new Product({
			name: "PS5",
			category: "Electronics",
			price: 499.99,
			imgURL: "url",
		})._id;

		const userToken = jwt.sign({ id: users[0]._id }, config.SECRET_KEY);
		const adminToken = jwt.sign({ id: users[1]._id }, config.SECRET_KEY);

		const content = JSON.stringify({
			tokens: {
				userToken,
				adminToken,
			},
			productId,
		});

		await fs.promises.writeFile("src/libs/testingTokens.json", content);
	} catch (err) {
		console.log(err);
	}
};
