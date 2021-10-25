import React, { Component } from "react";
import { Link } from "react-router-dom";
import Table from "../common/table";
// import Like from "../common/like";
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
    // { path: "description", label: "Description" },
    // { path: "img", label: "Image" },
    // { path: "cloudinary_id", label: "cloudinary" },
    // {
    // 	key: "like",
    // 	content: (product) => (
    // 		<Like liked={product.liked} onClick={() => this.props.onLike(product)} />
    // 	),
    // },
    // {
    // 	key: "image",
    // 	content: (product) => <image src={product.img} />,
    // },
    // {
    // 	key: "Des",
    // 	content: (product) => <Link to={`/products/d/${product._id}`}>Buy Now</Link>,
    // },
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

  listColumn = {
    key: "list",
    content: (product) => {
      if (product.listed !== true) {
        return (
          <button
            onClick={() => this.props.onList(product)}
            className="btn btn-warning btn-sm"
          >
            List it
          </button>
        );
      } else return <span>Listed</span>;
    },
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
    if (user && user.role === "admin") {
      this.columns.push(this.deleteColumn);
      this.columns.push(this.listColumn);
    }
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
