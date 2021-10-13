import Product from "../models/product.model";
import { cloudinary } from "../config/config";
// const upload = require("../utils/multer");
import catchAsyncErrors from "../middleware/error";
import ErrorHander from "../middleware/errorhander";

// @desc    Add a new product
// @route   POST /api/products/
// @access  Private/Admin
const addProduct = catchAsyncErrors(async (req, res) => {
	try {
		// Upload image to cloudinary
		const result = await cloudinary.uploader.upload(req.file.path);
		// Create new user
		let product = new Product({
			title: req.body.title,
			price: req.body.price,
			category: req.body.category,
			description: req.body.description,
			img: result.secure_url,
			cloudinary_id: result.public_id,
		});
		// Save user
		await product.save();
		res.json(product);
	} catch (err) {
		console.log(err);
	}
});

// @desc    What does this do
// @route   GET /api/products/
// @access  Permissions
const getAllProducts = async (req, res) => {
	Product.find()
		.then((product) => res.json(product))
		.catch((err) => res.status(400).json("Error: " + err));
};

// @desc    What does this do
// @route   PUT /api/products/:id
// @access  Permissions
const updateProduct = async (req, res) => {
	// 	Product.findById(req.params.id)
	// 		.then((product) => {
	// 			product.title = req.body.title;
	// 			product.price = req.body.price;
	// 			product.category = req.body.category;
	// 			product.description = req.body.description;

	// 			product
	// 				.save()
	// 				.then(() => res.json("product updated!"))
	// 				.catch((err) => res.status(400).json("Error: " + err));
	// 		})
	// 		.catch((err) => res.status(400).json("Error: " + err));
	// };

	try {
		let product = await Product.findById(req.params.id);
		// Delete image from cloudinary
		await cloudinary.uploader.destroy(product.cloudinary_id);
		// Upload image to cloudinary
		const result = await cloudinary.uploader.upload(req.file.path);
		const data = {
			title: req.body.title || product.title,
			price: req.body.price || product.price,
			category: req.body.category || product.category,
			description: req.body.description || product.description,
			img: result.secure_url || product.img,
			cloudinary_id: result.public_id || product.cloudinary_id,
		};
		product = await Product.findByIdAndUpdate(req.params.id, data, {
			new: true,
		});
		res.json(product);
	} catch (err) {
		console.log(err);
	}
};

// @desc    What does this do
// @route   DELETE /api/products/:id
// @access  Permissions
const deleteProduct = catchAsyncErrors(async (req, res) => {
	const product = await Product.findById(req.params.id);

	if (!product) {
		return next(new ErrorHander("Order not found with this Id", 404));
	} else if (product && !product.cloudinary_id) {
		await product.remove();
		res.status(200).json({
			success: true,
			product,
		});
		return;
	} else if (product && product.cloudinary_id) {
		await cloudinary.uploader.destroy(product.cloudinary_id);
		await product.remove();
		res.status(200).json({
			success: true,
			product,
		});
	}
});

// @desc    Get Product Info by Id
// @route   GET /api/products/:id
// @access  User/ Admin
const getProduct = async (req, res) => {
	Product.findById(req.params.id)
		.then((product) => res.json(product))
		.catch((err) => res.status(400).json("Error: " + err));
};
//export crud functions
export { getAllProducts, getProduct, updateProduct, deleteProduct, addProduct };
