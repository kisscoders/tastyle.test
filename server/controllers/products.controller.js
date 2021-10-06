import Product from "../models/product.model";
const cloudinary = require("../utils/cloudinary")
const upload = require("../utils/multer");


// @desc    Add a new product
// @route   POST /api/products/
// @access  Private/Admin
const addProduct = async (req, res) => {
// 	const title = req.body.title;
// 	const price = req.body.price;
// 	const category = req.body.category;
// 	const description = req.body.description;

// 	const newProduct = new Product({
// 		title,
// 		price,
// 		category,
// 		description,
// 	});

// 	newProduct
// 		.save()
// 		.then(() => res.json("Product added!"))
// 		.catch((err) => res.status(400).json("Error: " + err));
// };
try {
    // Upload image to cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);
     // Create new user
    let product = new Product({
	  title : req.body.title,
	  price : req.body.price,
	  category : req.body.category,
	  description : req.body.description,
      img: result.secure_url,
      cloudinary_id: result.public_id,
    });
    // Save user
    await product.save();
    res.json(product);
  } catch (err) {
    console.log(err);
  }}; 



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
		title : req.body.title|| product.title,
		price : req.body.price|| product.price,
		category : req.body.category|| product.category,
		description : req.body.description|| product.description,
		img: result.secure_url || product.img,
        cloudinary_id: result.public_id || product.cloudinary_id,
	};
	product = await Product.findByIdAndUpdate(req.params.id, data, {
 new: true
 });
	res.json(product);
  } catch (err) {
	console.log(err);
  }};

// @desc    What does this do
// @route   DELETE /api/products/:id
// @access  Permissions
const deleteProduct = async (req, res) => {
// 	Product.findByIdAndDelete(req.params.id)
// 		.then(() => res.json("product deleted."))
// 		.catch((err) => res.status(400).json("Error: " + err));
// };
try {
	// Find user by id
	let product = await Product.findById(req.params.id);
	// Delete image from cloudinary
	await cloudinary.uploader.destroy(product.cloudinary_id);
	// Delete user from db
	await product.remove();
	res.json(product);
  } catch (err) {
	console.log(err);
  }};

// @desc    What does this do
// @route   GET /api/products/:id
// @access  Permissions
const getProduct = async (req, res) => {
	Product.findById(req.params.id)
		.then((exercise) => res.json(exercise))
		.catch((err) => res.status(400).json("Error: " + err));
};
//export crud functions
export { getAllProducts, getProduct, updateProduct, deleteProduct, addProduct };

