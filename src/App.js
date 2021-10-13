import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import NavBar from "./components/layout/navBar";
import Products from "./components/product/products";
import Dashboard from "./components/dashboard/dashboard";
import Movies from "./components/movie/movies";
import MovieForm from "./components/movie/movieForm";
import ProductDetails from "./components/product/productDetails";
import NotFound from "./components/layout/notFound";
import Rentals from "./components/movie/rentals";
import LoginForm from "./components/user/loginForm";
import Posts from "./components/forum/posts";
import RegisterForm from "./components/user/registerForm";
import OrderForm from "./components/order/orderForm";
import Orders from "./components/order/orders";
import Logout from "./components/user/logout";
import ProductForm from "./components/product/productForm";
import ProtectedRoute from "./components/common/protectedRoute";
import Home from "./components/home/home";

import auth from "./services/authService";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { Container } from "react-bootstrap";
import ProductsGrid from "./components/product/productsList";

class App extends Component {
	state = {};

	componentDidMount() {
		const user = auth.getCurrentUser();
		this.setState({ user });
	}

	render() {
		const { user } = this.state;
		return (
			<div>
				<ToastContainer />
				<NavBar user={user} />
				<Container fluid>
					<Switch>
						{/* Put the more specific routes before the less specific ones */}
						<Route path="/not-found" component={NotFound} />
						<Route path="/login" component={LoginForm} />
						<Route path="/logout" component={Logout} />
						<Route path="/users/:id" component={RegisterForm} />
						<Route path="/products/:id" exact component={ProductForm} />
						<Route path="/products/d/:id" component={ProductDetails} />
						{/* <Route path="/orders/new" exact component={OrderForm} /> */}
						<Route path="/orders/:id" exact component={OrderForm} />
						<Route path="/orders" exact component={Orders} />
						<ProtectedRoute path="/movies/:id" component={MovieForm} />
						<Route path="/posts/:year?/:month?" component={Posts} />
						<Route path="/dash" component={Dashboard} />
						<Redirect from="/messages" to="/posts" />
						<Redirect from="/home" to="/" />
						<Route
							path="/movies"
							exact
							render={(props) => <Movies {...props} user={user} />}
						/>
						<Route
							path="/products"
							exact
							render={(props) => <Products {...props} user={user} />}
						/>
						<Route path="/list" component={ProductsGrid} />
						{/* <Route path="/customers" component={Customers} /> */}
						<Route path="/" exact component={Home} />
						{/* <Redirect from="/" exact to="/movies" /> */}
						<Redirect to="/not-found" />
					</Switch>
				</Container>
			</div>
		);
	}
}

export default App;
