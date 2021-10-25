import { Router } from "express";
const router = Router();
import { auth, admin } from "../middleware/auth";

import {
  getOrders, // @route   GET /api/orders/
  getMyOrders, // @route   GET /api/orders/me
  addOrder, // @route   POST /api/orders
  updateOrder, // @route   PUT /api/orders/:id
  deleteOrder, // @route   DELETE /api/orders/:id
  viewOrder, // @route   GET /api/orders/:id
  addMyAddress,
  updateMyAddress,
  deleteMyAddress,
  viewMyAddress,
  getMyAddresses,
  getMyPendingOrders,
  getMyHistoryOrders,
  makeDeliveredById,
} from "../controllers/orders.controller";

// Order Routes
router.route("/").post(auth, addOrder).get([auth, admin], getOrders);
router.route("/pending").get(auth, getMyPendingOrders);
router.route("/history").get(auth, getMyHistoryOrders);
router.route("/me").get(auth, getMyOrders);
router
  .route("/:id")
  .put(auth, updateOrder)
  .delete([auth, admin], deleteOrder) // admin required
  .get(viewOrder);

router
  .route("/changestatus/:id") // admin required
  .get([auth, admin], makeDeliveredById);

// Address Routes
router.route("/a/").post(auth, addMyAddress);
router.route("/a/me").get(auth, getMyAddresses);
router
  .route("/a/:id")
  .put(auth, updateMyAddress)
  .delete(auth, deleteMyAddress)
  .get(auth, viewMyAddress);

export default router;

// extra stuff

// router.route("/").post(protect, addOrderItems).get(protect, admin, getOrders);
// router.route("/me").get(protect, getMyOrders);
// router.route("/:id").get(protect, getOrderById);
// router.route("/:id/pay").put(protect, updateOrderToPaid);
// router.route("/:id/deliver").put(protect, admin, updateOrderToDelivered);

// import { protect, admin } from "../middleware/auth";

// const { Order, validate } = require("../models/Order");
// const { Genre } = require("../models/genre");
// const auth = require("../middleware/auth");
// const admin = require("../middleware/admin");
// const validateObjectId = require("../middleware/validateObjectId");
// const moment = require("moment");
// const mongoose = require("mongoose");
// const express = require("express");
// const router = express.Router();

// router.get("/", async (req, res) => {
//   const movies = await Movie.find().select("-__v").sort("name");
//   res.send(movies);
// });

// router.post("/", [auth], async (req, res) => {
//   const { error } = validate(req.body);
//   if (error) return res.status(400).send(error.details[0].message);

//   const genre = await Genre.findById(req.body.genreId);
//   if (!genre) return res.status(400).send("Invalid genre.");

//   const movie = new Movie({
//     title: req.body.title,
//     genre: {
//       _id: genre._id,
//       name: genre.name,
//     },
//     numberInStock: req.body.numberInStock,
//     dailyRentalRate: req.body.dailyRentalRate,
//     publishDate: moment().toJSON(),
//   });
//   await movie.save();

//   res.send(movie);
// });

// router.put("/:id", [auth], async (req, res) => {
//   const { error } = validate(req.body);
//   if (error) return res.status(400).send(error.details[0].message);

//   const genre = await Genre.findById(req.body.genreId);
//   if (!genre) return res.status(400).send("Invalid genre.");

//   const movie = await Movie.findByIdAndUpdate(
//     req.params.id,
//     {
//       title: req.body.title,
//       genre: {
//         _id: genre._id,
//         name: genre.name,
//       },
//       numberInStock: req.body.numberInStock,
//       dailyRentalRate: req.body.dailyRentalRate,
//     },
//     { new: true },
//   );

//   if (!movie)
//     return res.status(404).send("The movie with the given ID was not found.");

//   res.send(movie);
// });

// router.delete("/:id", [auth, admin], async (req, res) => {
//   const movie = await Movie.findByIdAndRemove(req.params.id);

//   if (!movie)
//     return res.status(404).send("The movie with the given ID was not found.");

//   res.send(movie);
// });

// router.get("/:id", validateObjectId, async (req, res) => {
//   const movie = await Movie.findById(req.params.id).select("-__v");

//   if (!movie)
//     return res.status(404).send("The movie with the given ID was not found.");

//   res.send(movie);
// });

// module.exports = router;
