import { Router } from "express";
import {
	createProduct,
	getProductById,
	getProducts,
	updateProductById,
	deleteProductById,
} from "../controllers/products.controller";
import { authJWT } from "../middlewares";

const router = Router();

router.post("/", [authJWT.verifyToken, authJWT.isModerator], createProduct);
router.get("/", getProducts);
router.get("/:productId", getProductById);
router.put(
	"/:productId",
	[authJWT.verifyToken, authJWT.isAdmin],
	updateProductById
);
router.delete(
	"/:productId",
	[authJWT.verifyToken, authJWT.isAdmin],
	deleteProductById
);

export default router;
