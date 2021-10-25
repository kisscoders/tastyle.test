import Product from "../models/product.model";
import cloudinary from "../utils/cloudinary";

import catchAsyncErrors from "../middleware/error";
import ErrorHander from "../middleware/errorhander";

// @desc    Add a new product
// @route   POST /api/products/
// @access  Private/Admin
const addProduct = catchAsyncErrors(async (req, res) => {
  try {
    // Upload image to cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);

    let product = new Product({
      title: req.body.title,
      price: req.body.price,
      category: req.body.category,
      description: req.body.description,
      img: result.secure_url,
      cloudinary_id: result.public_id,
    });

    // Save Product
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
  try {
    Product.find()
      .select(" -__v")
      .then((product) => res.json(product))
      .catch((err) => res.status(400).json("Error: " + err));
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

const getAllListedProducts = async (req, res) => {
  Product.find({ listed: true })
    .select("-listed -__v")
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
    const handle = { result: {} };
    // Delete image from cloudinary
    // Upload image to cloudinary
    if (req.file) {
      handle.result = await cloudinary.uploader.upload(req.file.path);
      if (handle.result) {
        await cloudinary.uploader.destroy(product.cloudinary_id);
      }
    }
    const { result } = handle;
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

const makeListedById = async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);
    if (product.listed === true) {
      res.send(`${product.title} is already listed`);
      return;
    }

    product = await Product.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          listed: true,
        },
      }
    );
    res.json(`${product.title} is listed now`);
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
      message: "Product Deleted Successfully",
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

// Going to Routes Folder see you there
export {
  getAllProducts,
  getAllListedProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  addProduct,
  makeListedById,
};
