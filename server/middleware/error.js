// const error1 = (err, req, res, next) => {
// 	console.log(err.message, err);

// 	// error
// 	// warn
// 	// info
// 	// verbose
// 	// debug
// 	// silly

// 	res.status(500).send("Something failed.");
// };

// const notFound = (req, res, next) => {
// 	const error = new Error(`Not Found - ${req.originalUrl}`);
// 	res.status(404);
// 	next(error);
// };

// const errorHandler = (err, req, res, next) => {
// 	const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
// 	res.status(statusCode);
// 	res.json({
// 		message: err.message,
// 		stack: process.env.NODE_ENV === "production" ? null : err.stack,
// 	});
// };

// export { notFound, errorHandler, error1 };
