import { Router } from "express";
const router = Router();
import {
	getGenres, // @route   GET /api/genres
	addGenre, // @route   POST /api/genres
	updateGenre, // @route   PUT /api/genres/:id
	deleteGenre, // @route   DELETE /api/genres/:id
	viewGenre, // @route   GET /api/genres/:id
} from "../controllers/genres.controller";

router.route("/").post(addGenre).get(getGenres);
router.route("/:id").put(updateGenre).delete(deleteGenre).get(viewGenre);

export default router;

// extra stuff

// router.route("/").post(protect, addOrderItems).get(protect, admin, getOrders);
// router.route("/myorders").get(protect, getMyOrders);
// router.route("/:id").get(protect, getOrderById);
// router.route("/:id/pay").put(protect, updateOrderToPaid);
// router.route("/:id/deliver").put(protect, admin, updateOrderToDelivered);

// import { protect, admin } from "../middleware/auth";

// const validateObjectId = require("../middleware/validateObjectId");
// const auth = require("../middleware/auth");
// const admin = require("../middleware/admin");
// const { Genre, validate } = require("../models/genre");
// const mongoose = require("mongoose");
// const express = require("express");
// const router = express.Router();

// router.get("/", async (req, res) => {
//   const genres = await Genre.find().select("-__v").sort("name");
//   res.send(genres);
// });

// router.post("/", auth, async (req, res) => {
//   const { error } = validate(req.body);
//   if (error) return res.status(400).send(error.details[0].message);

//   let genre = new Genre({ name: req.body.name });
//   genre = await genre.save();

//   res.send(genre);
// });

// router.put("/:id", [auth, validateObjectId], async (req, res) => {
//   const { error } = validate(req.body);
//   if (error) return res.status(400).send(error.details[0].message);

//   const genre = await Genre.findByIdAndUpdate(
//     req.params.id,
//     { name: req.body.name },
//     {
//       new: true,
//     },
//   );

//   if (!genre)
//     return res.status(404).send("The genre with the given ID was not found.");

//   res.send(genre);
// });

// router.delete("/:id", [auth, admin, validateObjectId], async (req, res) => {
//   const genre = await Genre.findByIdAndRemove(req.params.id);

//   if (!genre)
//     return res.status(404).send("The genre with the given ID was not found.");

//   res.send(genre);
// });

// router.get("/:id", validateObjectId, async (req, res) => {
//   const genre = await Genre.findById(req.params.id).select("-__v");

//   if (!genre)
//     return res.status(404).send("The genre with the given ID was not found.");

//   res.send(genre);
// });

// module.exports = router;
