import React, { Component } from "react";
import { Link } from "react-router-dom";
import Table from "../common/table";
import Like from "../common/like";
import authService from "../../services/authService";

class OrdersTable extends Component {
	columns = [
		{
			path: "product.title",
			label: "Product",
			content: (order) => (
				<Link to={`/orders/${order._id}`}>{order.product.title}</Link>
			),
		},
		{ path: "user.name", label: "Customer" },
		{ path: "priceSum", label: "Price" },
		{ path: "orderType", label: "Type" },
		{ path: "orderStatus", label: "Status" },
		{
			key: "like",
			content: (order) => (
				<Like liked={order.liked} onClick={() => this.props.onLike(order)} />
			),
		},
	];

	deleteColumn = {
		key: "delete",
		content: (order) => (
			<button
				onClick={() => this.props.onDelete(order)}
				className="btn btn-danger btn-sm"
			>
				Delete
			</button>
		),
	};

	constructor() {
		super();
		const user = authService.getCurrentUser();
		if (user && user.role === "admin") this.columns.push(this.deleteColumn);
	}

	render() {
		const { orders, onSort, sortColumn } = this.props;

		return (
			<Table
				columns={this.columns}
				data={orders}
				sortColumn={sortColumn}
				onSort={onSort}
			/>
		);
	}
}

export default OrdersTable;
