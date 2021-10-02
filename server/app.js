import express from "express";
import cors from "cors";

const app = express(); // creating express app

app.use(cors()); // using cors to authenticate or something
app.use(express.json()); // JSON parsing for requests from app

require("./routes/index.routes")(app); // routes index file incoming

export default app; // going to server. byeee

// extra stuff

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
