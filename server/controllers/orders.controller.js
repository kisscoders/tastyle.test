import Order from "../models/order.model";
import Address from "../models/address.model";
import User from "../models/user.model";
import Product from "../models/product.model";

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = async (req, res) => {
	const orders = await Order.find().select("-__v").sort("name");
	return res.status(200).json(orders);
};

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrder = async (req, res, next) => {
	// const { error } = validate(req.body);
	// if (error) return res.status(400).send(error.details[0].message);

	const address = await Address.findById(req.body.addressId);
	if (!address) return res.status(400).send("Invalid address.");
	const product = await Product.findById(req.body.productId);
	if (!product) return res.status(400).send("Invalid product.");
	// const user = await User.findOne({ email: req.body.email });
	// if (!user) return res.status(400).send("Invalid user.");
	// console.log(user);

	const order = new Order({
		product: {
			_id: product._id,
			title: product.title,
			price: product.price,
		},
		quantityVar: req.body.quantityVar,
		priceSum: req.body.priceSum,
		orderType: req.body.orderType,
		deliverTo: {
			_id: address._id,
			firstName: address.firstName,
			lastName: address.lastName,
			contactNo: address.contactNo,
			addLine1: address.addLine1,
			addLine2: address.addLine2,
			city: address.city,
			zipcode: address.zipcode,
			landmarks: address.landmarks,
		},
		// customer: {
		// 	name: user.name,
		// 	email: user.email,
		// },
		orderStatus: req.body.orderStatus,
		deliveredAt: req.body.deliveredAt,
		createdAt: Date.now,
	});
	await order.save();

	res.send(order);
};

const updateOrder = async (req, res) => {
	const orders = await Order.find().select("-__v").sort("name");
	return res.status(200).json(orders);
};

const deleteOrder = async (req, res) => {
	const orders = await Order.find().select("-__v").sort("name");
	return res.status(200).json(orders);
};

const viewOrder = async (req, res) => {
	const orders = await Order.find().select("-__v").sort("name");
	return res.status(200).json(orders);
};

const getAddresses = async (req, res) => {
	const orders = await Address.find().select("-__v").sort("name");
	return res.status(200).json(orders);
};

const addAddress = async (req, res) => {
	let address = new Address({
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		contactNo: req.body.contactNo,
		addLine1: req.body.addLine1,
		addLine2: req.body.addLine2,
		city: req.body.city,
		zipcode: req.body.zipcode,
		landmarks: req.body.landmarks,
	});
	address = await address.save();
	res.status(200).json(address);
};

const updateAddress = async (req, res) => {
	// const { error } = validate(req.body);
	// if (error) return res.status(400).send(error.details[0].message);

	const address = await Address.findByIdAndUpdate(
		req.params.id,
		{
			firstName: req.body.firstName,
			lastName: req.body.lastName,
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
	addOrder,
	updateOrder,
	deleteOrder,
	viewOrder,
	getAddresses,
	addAddress,
	updateAddress,
	deleteAddress,
	viewAddress,
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
// // @route   GET /api/orders/myorders
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
