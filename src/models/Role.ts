import { Schema, model, Document } from "mongoose";

type Role = {
	name: string;
} & Document;

export enum Roles {
	admin = "admin",
	moderator = "moderator",
	user = "user",
}

const roleSchema = new Schema(
	{
		name: String,
	},
	{
		versionKey: false,
	}
);

export default model<Role>("Role", roleSchema);
