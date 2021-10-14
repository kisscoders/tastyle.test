import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import NavBar from "./components/layout/navBar";
import Dashboard from "./views/dashboard";
import ProductDetails from "./components/product/productDetails";
import NotFound from "./components/layout/notFound";
import LoginPage from "./views/login";
import SignupPage from "./views/signup";
import OrderForm from "./components/order/orderForm";
import Orders from "./components/order/orders";
import Logout from "./components/user/logout";
import ProductForm from "./components/product/productForm";
// import ProtectedRoute from "./components/common/protectedRoute";
import Home from "./views/home";

import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { Container } from "react-bootstrap";
import ProductsGrid from "./components/product/productsList";
import ClassicCard from "./components/layout/card";

export default function App() {
	return (
		<div>
			<ToastContainer />
			<NavBar />
			<Container fluid>
				<Switch>
					{/* Put the more specific routes before the less specific ones */}
					<Route path="/not-found" component={NotFound} />
					<Route path="/card" component={ClassicCard} />

					<Route path="/login" exact component={LoginPage} />
					<Route path="/logout" exact component={Logout} />
					<Route path="/signup" exact component={SignupPage} />

					<Route path="/products/d/:id" component={ProductDetails} />
					<Route path="/products/:id" exact component={ProductForm} />
					<Route path="/list" component={ProductsGrid} />
					{/* <Route path="/products/" component={Products} /> */}

					<Route path="/orders/:id" exact component={OrderForm} />
					<Route path="/orders" exact component={Orders} />

					<Route path="/dash" component={Dashboard} />
					<Redirect from="/home" to="/" />
					<Route path="/" exact component={Home} />
					<Redirect to="/not-found" />
				</Switch>
			</Container>
		</div>
	);
}
