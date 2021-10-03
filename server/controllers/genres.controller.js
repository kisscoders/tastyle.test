import Genre, { validate } from "../models/genre.model";

// @desc    Get all genres
// @route   GET /api/genres
// @access  Private/Admin
const getGenres = async (req, res) => {
	const genres = await Genre.find().select("-__v").sort("name");
	return res.status(200).json(genres);
};
// TODO:
//?
// @desc    Create new genre
// @route   POST /api/genres
// @access  Private
const addGenre = async (req, res) => {
	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);
	let genre = new Genre({ name: req.body.name });
	genre = await genre.save();
	res.status(200).json("Genre created!", genre);
};

// @desc    Update a genre
// @route   PUT /api/genres/:id
// @access  Private validate objectid
const updateGenre = async (req, res) => {
	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	const genre = await Genre.findByIdAndUpdate(
		req.params.id,
		{ name: req.body.name },
		{ new: true }
	);

	if (!genre)
		return res.status(404).send("The genre with the given ID was not found.");

	res.send(genre);
};

// @desc    Delete a genre
// @route   DELETE /api/genres/:id
// @access  Private admin validate objectid
const deleteGenre = async (req, res) => {
	const genre = await Genre.findByIdAndRemove(req.params.id);

	if (!genre)
		return res.status(404).send("The genre with the given ID was not found.");

	res.send(genre);
};

// @desc    View a genre
// @route   GET /api/genres/:id
// @access  Private
const viewGenre = async (req, res) => {
	const genre = await Genre.findById(req.params.id).select("-__v");

	if (!genre)
		return res.status(404).send("The genre with the given ID was not found.");

	res.send(genre);
};

export { getGenres, addGenre, updateGenre, deleteGenre, viewGenre };
