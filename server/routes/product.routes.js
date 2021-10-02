import { Router } from "express";
const router = Router();
import { auth } from "../middleware/auth";

import {
	getAllProducts,
	getProduct,
	addProduct,
	updateProduct,
	deleteProduct,
} from "../controllers/products.controller";

router.route("/").post(auth, addProduct).get(getAllProducts);
router
	.route("/:id")
	.put(auth, updateProduct)
	.delete(auth, deleteProduct)
	.get(getProduct);

export default router;
