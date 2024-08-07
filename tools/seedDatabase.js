// Sample Movies Data Seeding
import { Genre } from "../server/models/genre.model";
import { Movie } from "../server/models/movie.model";
import mongoose from "mongoose";
import { url } from "../server/config/config";

const data = [
	{
		name: "Comedy",
		movies: [
			{
				title: "Airplane",
				numberInStock: 5,
				dailyRentalRate: 2,
			},
			{
				title: "The Hangover",
				numberInStock: 10,
				dailyRentalRate: 2,
			},
			{
				title: "Wedding Crashers",
				numberInStock: 15,
				dailyRentalRate: 2,
			},
		],
	},
	{
		name: "Action",
		movies: [
			{
				title: "Die Hard",
				numberInStock: 5,
				dailyRentalRate: 2,
			},
			{
				title: "Terminator",
				numberInStock: 10,
				dailyRentalRate: 2,
			},
			{
				title: "The Avengers",
				numberInStock: 15,
				dailyRentalRate: 2,
			},
		],
	},
	{
		name: "Romance",
		movies: [
			{
				title: "The Notebook",
				numberInStock: 5,
				dailyRentalRate: 2,
			},
			{
				title: "When Harry Met Sally",
				numberInStock: 10,
				dailyRentalRate: 2,
			},
			{
				title: "Pretty Woman",
				numberInStock: 15,
				dailyRentalRate: 2,
			},
		],
	},
	{
		name: "Thriller",
		movies: [
			{
				title: "The Sixth Sense",
				numberInStock: 5,
				dailyRentalRate: 2,
			},
			{
				title: "Gone Girl",
				numberInStock: 10,
				dailyRentalRate: 2,
			},
			{
				title: "The Others",
				numberInStock: 15,
				dailyRentalRate: 2,
			},
		],
	},
];

async function seed() {
	await mongoose.connect(url, {
		useUnifiedTopology: true,
		useNewUrlParser: true,
		useCreateIndex: true,
	});

	await Movie.deleteMany({});
	await Genre.deleteMany({});

	for (let genre of data) {
		const { _id: genreId } = await new Genre({
			name: genre.name,
		}).save();
		const movies = genre.movies.map((movie) => ({
			...movie,
			genre: { _id: genreId, name: genre.name },
		}));
		await Movie.insertMany(movies);
	}

	mongoose.disconnect();

	console.info("Done!");
}

seed();
