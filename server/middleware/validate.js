// module.exports = (validator) => {
// 	return (req, res, next) => {
// 		const { error } = validator(req.body);
// 		if (error) return res.status(400).send(error.details[0].message);
// 		next();
// 	};
// };

// // validate object id

// const mongoose = require("mongoose");

// module.exports = function (req, res, next) {
// 	if (!mongoose.Types.ObjectId.isValid(req.params.id))
// 		return res.status(404).send("Invalid ID.");

// 	next();
// };
