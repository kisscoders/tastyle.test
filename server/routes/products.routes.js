import { Router } from "express";
const router = Router();
import { auth, admin } from "../middleware/auth";
import { productsUpload } from "../utils/multer";

const upload = productsUpload;

import {
  getAllProducts,
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
  getAllListedProducts,
  makeListedById,
} from "../controllers/products.controller";

// router.route("/").post(auth, addProduct).get(getAllProducts);
// router
// 	.route("/:id")
// 	.put(auth, updateProduct)
// 	.delete(auth, deleteProduct)
// 	.get(getProduct);
router.route("/").get(getAllListedProducts);

router
  .route("/dash")
  .post([auth, admin], upload.single("image"), addProduct)
  .get([auth, admin], getAllProducts);

router
  .route("/dash/:id")
  .put([auth, admin], upload.single("image"), updateProduct)
  .delete([auth, admin], deleteProduct);

router.route("/dash/makelisted/:id").get([auth, admin], makeListedById);

router.route("/:id").get(getProduct);
// // router.put("/:id", upload.single("image"), async (req, res)
// router
// 	.route("/:id")
// 	.put(updateProduct)
// 	.delete(deleteProduct)

export default router;
