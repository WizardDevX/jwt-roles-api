import { Schema, model, Document, Model } from "mongoose";
import bcryptjs from "bcryptjs";

type User = {
	username: string;
	email: string;
	password: string;
	roles: string[];
} & Document;

type UserModel = {
	encryptPassword(password: string): Promise<string>;
	comparePassword(
		password: string,
		receivedPassword: string
	): Promise<boolean>;
} & Model<User & Document>;

const userSchema = new Schema(
	{
		username: { type: String, unique: true },
		email: { type: String, unique: true },
		password: { type: String, unique: true },
		roles: [
			{
				ref: "Role",
				type: Schema.Types.ObjectId,
			},
		],
	},
	{
		timestamps: true,
		versionKey: false,
	}
);

const statics = {
	encryptPassword: async (password: string) => {
		const salt = await bcryptjs.genSalt(10);
		return await bcryptjs.hash(password, salt);
	},
	comparePassword: async (password: string, receivedPassword: string) => {
		return await bcryptjs.compare(password, receivedPassword);
	},
};

userSchema.statics = statics;

export default model<User, UserModel>("User", userSchema);
