import Movie, { validate } from "../models/movie.model";
import Genre from "../models/genre.model";

// @desc    Get all movies
// @route   GET /api/movies
// @access  Private/Admin
const getMovies = async (req, res) => {
	const movies = await Movie.find().select("-__v").sort("name");
	return res.status(200).json(movies);
};

// @desc    Create new movie
// @route   POST /api/movies
// @access  Private
const addMovie = async (req, res) => {
	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	const genre = await Genre.findById(req.body.genreId);
	if (!genre) return res.status(400).send("Invalid genre.");

	const movie = new Movie({
		title: req.body.title,
		genre: {
			_id: genre._id,
			name: genre.name,
		},
		numberInStock: req.body.numberInStock,
		dailyRentalRate: req.body.dailyRentalRate,
		// publishDate: moment().toJSON(),
	});
	await movie.save();

	res.send(movie);
};

// @desc    Update a movie
// @route   PUT /api/movies/:id
// @access  Private
const updateMovie = async (req, res) => {
	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	const genre = await Genre.findById(req.body.genreId);
	if (!genre) return res.status(400).send("Invalid genre.");

	const movie = await Movie.findByIdAndUpdate(
		req.params.id,
		{
			title: req.body.title,
			genre: {
				_id: genre._id,
				name: genre.name,
			},
			numberInStock: req.body.numberInStock,
			dailyRentalRate: req.body.dailyRentalRate,
		},
		{ new: true }
	);

	if (!movie)
		return res.status(404).send("The movie with the given ID was not found.");

	res.send(movie);
};

// @desc    Delete a movie
// @route   DELETE /api/movies/:id
// @access  Private admin
const deleteMovie = async (req, res) => {
	const movie = await Movie.findByIdAndRemove(req.params.id);

	if (!movie)
		return res.status(404).send("The movie with the given ID was not found.");

	res.send(movie);
};

// @desc    View a movie
// @route   GET /api/movies/:id
// @access  Private
const viewMovie = async (req, res) => {
	const movie = await Movie.findById(req.params.id).select("-__v");

	if (!movie)
		return res.status(404).send("The movie with the given ID was not found.");

	res.send(movie);
};

export { getMovies, addMovie, updateMovie, deleteMovie, viewMovie };
