import movies from "./movies.routes";
import genres from "./genres.routes";
import users from "./users.routes";
// import auth from "./auth.routes";
import product from "./product.routes";

module.exports = (app) => {
	app.use("/api/movies", movies);
	app.use("/api/genres", genres);
	app.use("/api/users", users);
	app.use("/api/products", product);
	// app.use("/api/auth", auth);
	app.get("/api", (req, res) => {
		res.json({ message: "You just made contact with tastyle server" });
	});
};

// Extra Stuff

// app.get("*", (req, res) => {
// res.send(undefined);
// console.log(`you have no idea what you just did! ${(req, res)}`);
// res.sendFile(resolve(__dirname, "../build", "index.html"));
// });
