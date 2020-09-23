import { Schema, model, Document } from "mongoose";

type Product = {
	name: string;
	category: string;
	price: number;
	imgURL: string;
} & Document;

const productSchema = new Schema(
	{
		name: String,
		category: String,
		price: Number,
		imgURL: String,
	},
	{
		timestamps: true,
		versionKey: false,
	}
);

export default model<Product>("Product", productSchema);
