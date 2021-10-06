import movies from "./movies.routes";
import genres from "./genres.routes";
import users from "./users.routes";
import products from "./products.routes";
import orders from "./orders.routes";

module.exports = (app) => {
	app.use("/api/movies", movies);
	app.use("/api/genres", genres);
	app.use("/api/users", users);
	app.use("/api/products", products);
	app.use("/api/orders", orders);
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
