import { Router } from "express";
const router = Router();
const upload = require("../utils/multer");
import { auth } from "../middleware/auth";

import {
	getAllProducts,
	getProduct,
	addProduct,
	updateProduct,
	deleteProduct,
} from "../controllers/products.controller";

// router.route("/").post(auth, addProduct).get(getAllProducts);
// router
// 	.route("/:id")
// 	.put(auth, updateProduct)
// 	.delete(auth, deleteProduct)
// 	.get(getProduct);
router.route("/").post(upload.single("image"), addProduct).get(getAllProducts);
router.route("/:id").put(upload.single("image"), updateProduct);
router.route("/:id").delete(upload.single("image"), deleteProduct);
// router.put("/:id", upload.single("image"), async (req, res)
router
	.route("/:id")
	.put(updateProduct)
	.delete(deleteProduct)
	.get(getProduct);


export default router;
