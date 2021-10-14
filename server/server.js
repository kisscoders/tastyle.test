import app from "./app"; // express related stuff moved here
import { port } from "./config/config"; // port and mongoose connect here
import connectDB from "./utils/mongDB"; // port and mongoose connect here
// import express from "express";

// const app = express(); // creating express app

// app.use(cors()); // using cors to authenticate or something
// app.use(express.json()); // JSON parsing for requests from app

// require("./routes/index.routes")(app); // routes index file incoming

connectDB(); // connecting to database

// initiating server
app.listen(port, () => {
	console.log(`tastyle server is having fun on ${port}`);
});

// extra stuff

// import path from "path";
// import morgan from "morgan";
// import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

// const winston = require("winston");
// const config = require("config");

// require("./startup/logging")();
// require("./startup/cors")(app);
// require("./startup/routes")(app);
// require("./startup/db")();
// require("./startup/config")();
// require("./startup/validation")();

// const port = process.env.PORT || config.get("port");
// const server = app.listen(port, () =>
//   winston.info(`Listening on port ${port}...`)
// );

// module.exports = server;

// All other GET requests not handled before will return our React app
// Intercept requests to return the frontend's static entry point
// app.get("*", (req, res) => {
//   console.log(`you have no idea what you just did!`);
//   res.sendFile(resolve(__dirname, "../build", "index.html"));
// });

// Declare the path to frontend's static assets
// app.use(express.static(resolve('..', 'build')));
// Have Node serve the files for our built React app
// app.use(express.static(resolve(__dirname, "../build")));

// if (process.env.NODE_ENV === 'development') {
//   app.use(morgan('dev'))
// }

// app.get("/api/config/paypal", (req, res) =>
//   res.send(process.env.PAYPAL_CLIENT_ID),
// );

// const __dirname = path.resolve();
// app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "/frontend/build")));

//   app.get("*", (req, res) =>
//     res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html")),
//   );
// } else {
//   app.get("/", (req, res) => {
//     res.send("API is running....");
//   });
// }

// app.use(notFound);
// app.use(errorHandler);
