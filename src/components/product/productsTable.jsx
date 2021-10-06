import React, { Component } from "react";
import { Link } from "react-router-dom";
import Table from "../common/table";
import Like from "../common/like";
import authService from "../../services/authService";

class ProductsTable extends Component {
	columns = [
		{
			path: "title",
			label: "Name",
			content: (product) => (
				<Link to={`/products/${product._id}`}>{product.title}</Link>
			),
		},
		{ path: "price", label: "Price" },
		{ path: "category", label: "Category" },
		{ path: "description", label: "Description" },
		{
			key: "like",
			content: (product) => (
				<Like liked={product.liked} onClick={() => this.props.onLike(product)} />
			),
		},
		{
			key: "Description",
			content: (product) => (
				<Link to={`/products/d/${product._id}`}>Description</Link>
			),
		},
	];

	deleteColumn = {
		key: "delete",
		content: (product) => (
			<button
				onClick={() => this.props.onDelete(product)}
				className="btn btn-danger btn-sm"
			>
				Delete
			</button>
		),
	};

	// editColumn = {
	// 	key: "Description",
	// 	content: (product) => (
	// 		<Link to={`/products/d/${product._id}`}>Description</Link>
	// 	),
	// };

	constructor() {
		super();
		const user = authService.getCurrentUser();
		if (user && user.isAdmin) this.columns.push(this.deleteColumn);
	}

	render() {
		const { products, onSort, sortColumn } = this.props;

		return (
			<Table
				columns={this.columns}
				data={products}
				sortColumn={sortColumn}
				onSort={onSort}
			/>
		);
	}
}

export default ProductsTable;
