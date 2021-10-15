import Order from "../models/order.model";
import Address from "../models/address.model";
import Product from "../models/product.model";
import catchAsyncErrors from "../middleware/error";

// @desc    Get current user's orders
// @route   GET /api/orders/me
// @access  Private/Admin
const getMyOrders = catchAsyncErrors(async (req, res) => {
  const orders = await Order.find({ user: req.user._id })
    .populate("user", "name email")
    .populate("deliverTo", "contactNo city addLine1")
    .populate("product", "title price");

  res.status(200).json({
    success: true,
    orders,
  });
});

// @desc    Get current user's addresses
// @route   GET /api/orders/a/me
// @access  Private/Admin
const getMyAddresses = catchAsyncErrors(async (req, res) => {
  const addresses = await Address.find({ user: req.user._id }).select(
    "-user -__v"
  );
  res.status(200).json({
    success: true,
    addresses,
  });
});

// @desc    Get all orders
// @route   GET /api/orders
// @access  Admin
const getOrders = catchAsyncErrors(async (req, res) => {
  const orders = await Order.find()
    .populate("user", "name email")
    .populate("deliverTo", "contactNo city addLine1")
    .populate("product", "title price");
  // let totalAmount = 0;

  // orders.forEach((order) => {
  //   totalAmount += order.totalPrice;
  // });

  res.status(200).json({
    success: true,
    //   totalAmount,
    orders,
  });
});

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrder = catchAsyncErrors(async (req, res, next) => {
  const order = new Order({
    product: req.body.productId,
    quantityVar: req.body.quantityVar,
    priceSum: req.body.priceSum,
    orderType: req.body.orderType,
    deliverTo: req.body.addressId,
    user: req.user._id,
    orderStatus: req.body.orderStatus,
  });

  const orderDoc = await order.save();
  const orderId = orderDoc._id;
  const orderDetails = await Order.findById(orderId)
    .populate("user", "name email")
    .populate("deliverTo", "contactNo city addLine1")
    .populate("product", "title price");

  res.status(201).json({
    success: true,
    orderDetails,
  });
});

// @desc    Update an order
// @route   POST /api/orders/:id
// @access  Admin
const updateOrder = catchAsyncErrors(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHander("Order not found with this Id", 404));
  }

  if (order.orderStatus === "Delivered") {
    return next(new ErrorHander("You have already delivered this order", 400));
  }

  // if (req.body.status === "Shipped") {
  // 	order.orderItems.forEach(async (o) => {
  // 		await updateStock(o.product, o.quantity);
  // 	});
  // }
  order.orderStatus = req.body.status;

  if (req.body.status === "Delivered") {
    order.deliveredAt = Date.now();
  }

  await order.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
  });
});

async function updateStock(id, quantity) {
  const product = await Product.findById(id);

  product.Stock -= quantity;

  await product.save({ validateBeforeSave: false });
}

// @desc    Delete an order
// @route   POST /api/orders/:id
// @access  Private
const deleteOrder = catchAsyncErrors(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHander("Order not found with this Id", 404));
  }

  await order.remove();

  res.status(200).json({
    success: true,
  });
});

// @desc    Get a specific order
// @route   GET /api/orders/:id
// @access  Private/Admin
const viewOrder = catchAsyncErrors(async (req, res) => {
  const order = await Order.findById(req.params.id)
    .populate("user", "name email")
    .populate("deliverTo", "contactNo city addLine1")
    .populate("product", "title price");

  if (!order) {
    return;
    // return next(new ErrorHander("Order not found with this Id", 404));
  }

  res.status(200).json({
    success: true,
    order,
  });
});

const getAddresses = catchAsyncErrors(async (req, res) => {
  const addresses = await Address.find().select("-__v");
  res.status(200).json({
    success: true,
    addresses,
  });
});

const addAddress = catchAsyncErrors(async (req, res) => {
  let address = new Address({
    user: req.user._id,
    nickName: req.body.nickName,
    contactNo: req.body.contactNo,
    addLine1: req.body.addLine1,
    addLine2: req.body.addLine2,
    city: req.body.city,
    zipcode: req.body.zipcode,
    landmarks: req.body.landmarks,
  });
  address = await address.save();
  res.status(200).json(address);
});

const updateAddress = async (req, res) => {
  const address = await Address.findByIdAndUpdate(
    req.params.id,
    {
      user: req.user._id,
      nickName: req.body.nickName,
      contactNo: req.body.contactNo,
      addLine1: req.body.addLine1,
      addLine2: req.body.addLine2,
      city: req.body.city,
      zipcode: req.body.zipcode,
      landmarks: req.body.landmarks,
    },
    { new: true }
  );

  if (!address)
    return res.status(404).send("The address with the given ID was not found.");

  res.send(address);
};

const deleteAddress = async (req, res) => {
  const address = await Address.findByIdAndRemove(req.params.id);

  if (!address)
    return res.status(404).send("The address with the given ID was not found.");

  res.send(address);
};

const viewAddress = async (req, res) => {
  const address = await Address.findById(req.params.id).select("-__v");

  if (!address)
    return res.status(404).send("The address with the given ID was not found.");

  res.send(address);
};

export {
  getOrders,
  getMyOrders,
  addOrder,
  updateOrder,
  deleteOrder,
  viewOrder,
  getAddresses,
  addAddress,
  updateAddress,
  deleteAddress,
  viewAddress,
  getMyAddresses,
};

// import { Router } from "express";
// import Order from "../models/extra/order.model";
// var express = require("express");
// const router = Router();
// router.use(express.json());

// router.route("/").post(async (request, response) => {
// 	try {
// 		const order = new Order(request.body);
// 		await order.save();
// 		return response.status(200).json("Order created!");
// 	} catch (error) {
// 		return response.status(400).send(error);
// 	}
// });

// router.route("/").get(async (_, response) => {
// 	const orders = await Order.find();
// 	return response.status(200).json(orders);
// });

// export default router;
// extra stuff

// // @desc    What does this do
// // @route   CRUD /url
// // @access  Permissions
// const exampleFunction = async (req, res) => {};

//! Need to check
// import asyncHandler from 'express-async-handler'

// was default

// router.route("/").post(async (request, response) => {
//   try {
//     const movie = new Movie(request.body);
//     await movie.save();
//     return response.status(200).json("Movie created!");
//   } catch (error) {
//     return response.status(400).send(error);
//   }
// });

// router.route("/").get(async (_, response) => {
//   const movies = await Movie.find();
//   return response.status(200).json(movies);
// });

// export default router;

// // @desc    Create new order
// // @route   POST /api/orders
// // @access  Private
// const addOrderItems = asyncHandler(async (req, res) => {
//   const {
//     orderItems,
//     shippingAddress,
//     paymentMethod,
//     itemsPrice,
//     taxPrice,
//     shippingPrice,
//     totalPrice,
//   } = req.body

//   if (orderItems && orderItems.length === 0) {
//     res.status(400)
//     throw new Error('No order items')
//     return
//   } else {
//     const order = new Order({
//       orderItems,
//       user: req.user._id,
//       shippingAddress,
//       paymentMethod,
//       itemsPrice,
//       taxPrice,
//       shippingPrice,
//       totalPrice,
//     })

//     const createdOrder = await order.save()

//     res.status(201).json(createdOrder)
//   }
// })

// // @desc    Get order by ID
// // @route   GET /api/orders/:id
// // @access  Private
// const getOrderById = asyncHandler(async (req, res) => {
//   const order = await Order.findById(req.params.id).populate(
//     'user',
//     'name email'
//   )

//   if (order) {
//     res.json(order)
//   } else {
//     res.status(404)
//     throw new Error('Order not found')
//   }
// })

// // @desc    Update order to paid
// // @route   GET /api/orders/:id/pay
// // @access  Private
// const updateOrderToPaid = asyncHandler(async (req, res) => {
//   const order = await Order.findById(req.params.id)

//   if (order) {
//     order.isPaid = true
//     order.paidAt = Date.now()
//     order.paymentResult = {
//       id: req.body.id,
//       status: req.body.status,
//       update_time: req.body.update_time,
//       email_address: req.body.payer.email_address,
//     }

//     const updatedOrder = await order.save()

//     res.json(updatedOrder)
//   } else {
//     res.status(404)
//     throw new Error('Order not found')
//   }
// })

// // @desc    Update order to delivered
// // @route   GET /api/orders/:id/deliver
// // @access  Private/Admin
// const updateOrderToDelivered = asyncHandler(async (req, res) => {
//   const order = await Order.findById(req.params.id)

//   if (order) {
//     order.isDelivered = true
//     order.deliveredAt = Date.now()

//     const updatedOrder = await order.save()

//     res.json(updatedOrder)
//   } else {
//     res.status(404)
//     throw new Error('Order not found')
//   }
// })

// // @desc    Get logged in user orders
// // @route   GET /api/orders/me
// // @access  Private
// const getMyOrders = asyncHandler(async (req, res) => {
//   const orders = await Order.find({ user: req.user._id })
//   res.json(orders)
// })

// // @desc    Get all orders
// // @route   GET /api/orders
// // @access  Private/Admin
// const getOrders = asyncHandler(async (req, res) => {
//   const orders = await Order.find({}).populate('user', 'id name')
//   res.json(orders)
// })

// export {
//   addOrderItems,
//   getOrderById,
//   updateOrderToPaid,
//   updateOrderToDelivered,
//   getMyOrders,
//   getOrders,
// }
