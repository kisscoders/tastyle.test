import { Router } from "express";
const router = Router();
import { auth, admin } from "../middleware/auth";

import {
	getMovies, // @route   GET /api/movies
	addMovie, // @route   POST /api/movies
	updateMovie, // @route   PUT /api/movies/:id
	deleteMovie, // @route   DELETE /api/movies/:id
	viewMovie, // @route   GET /api/movies/:id
} from "../controllers/movies.controller";

router.route("/").post(auth, addMovie).get(getMovies);
router
	.route("/:id")
	.put(auth, updateMovie)
	.delete([auth, admin], deleteMovie) // admin required
	.get(viewMovie);

export default router;

// extra stuff

// router.route("/").post(protect, addOrderItems).get(protect, admin, getOrders);
// router.route("/myorders").get(protect, getMyOrders);
// router.route("/:id").get(protect, getOrderById);
// router.route("/:id/pay").put(protect, updateOrderToPaid);
// router.route("/:id/deliver").put(protect, admin, updateOrderToDelivered);

// import { protect, admin } from "../middleware/auth";

// const { Movie, validate } = require("../models/movie");
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
