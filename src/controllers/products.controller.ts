import { Request, Response } from "express";
import Product from "../models/Product";

export const createProduct = async (req: Request, res: Response) => {
	const { name, category, price, imgURL } = req.body;

	const newProduct = new Product({ name, category, price, imgURL });

	const productSaved = await newProduct.save();

	res.status(201).json({
		productSaved,
	});
};

export const getProducts = async (req: Request, res: Response) => {
	const products = await Product.find();
	res.status(200).json(products);
};

export const getProductById = async (req: Request, res: Response) => {
	const { productId } = req.params;
	const product = await Product.findById(productId);
	res.status(200).json(product);
};

export const updateProductById = async (req: Request, res: Response) => {
	const { productId } = req.params;
	const updatedProduct = await Product.findByIdAndUpdate(
		productId,
		req.body,
		{
			new: true,
		}
	);
	res.status(200).json(updatedProduct);
};

export const deleteProductById = async (req: Request, res: Response) => {
	const { productId } = req.params;
	await Product.findByIdAndDelete(productId);
	res.sendStatus(204);
};
