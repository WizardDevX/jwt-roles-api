import express, { Request, Response } from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import pkg from "../package.json";

import { seedDatabase } from "./libs/initialSetup";

import productsRoutes from "./routes/products.routes";
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";

import "./database";

const app = express();
seedDatabase();

app.set("pkg", pkg);
//app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
	res.json({
		name: app.get("pkg").name,
		author: app.get("pkg").author,
		description: app.get("pkg").description,
		version: app.get("pkg").version,
	});
});

app.use("/api/products", productsRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

export default app;
