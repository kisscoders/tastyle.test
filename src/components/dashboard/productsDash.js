import React, { Component } from "react";
import { Link } from "react-router-dom";
import _ from "lodash";
import { toast } from "react-toastify";
import { deleteProduct, getProducts } from "../../services/productService";
import Pagination from "../common/pagination";
import { paginate } from "../../utils/paginate";
import ProductsTable from "../product/productsTable";
import SearchBar from "../common/searchBar";
class ProductsDash extends Component {
	state = {
		prodcts: [],
		currentPage: 1,
		pageSize: 4,
		searchQuery: "",
		sortColumn: { path: "title", order: "asc" },
	};

	async componentDidMount() {
		const { data: prodcts } = await getProducts();
		this.setState({ prodcts });
	}

	handleDelete = async (product) => {
		const originalProduct = this.state.prodcts;
		const prodcts = originalProduct.filter((m) => m._id !== product._id);
		this.setState({ prodcts });
		try {
			await deleteProduct(product._id);
		} catch (error) {
			if (error.response && error.response.status === 404) {
				toast.error("This product has already been deleted");
				this.setState({ prodcts: originalProduct });
			}
		}
	};

	handleLike = (product) => {
		console.log(this.state.prodcts);
		const prodcts = [...this.state.prodcts];
		const index = prodcts.indexOf(product);
		prodcts[index] = { ...prodcts[index] };
		prodcts[index].liked = !prodcts[index].liked;
		this.setState({ prodcts });
	};

	handlePageChange = (page) => {
		this.setState({ currentPage: page });
	};

	handleSearch = (query) => {
		this.setState({
			searchQuery: query,
			selectedGenre: null,
			currentPage: 1,
		});
	};
	handleSort = (sortColumn) => {
		this.setState({ sortColumn });
	};

	getPagedData = () => {
		const {
			pageSize,
			currentPage,
			sortColumn,
			// selectedGenre,
			searchQuery,
			prodcts: allProducts,
		} = this.state;

		let filtered = allProducts;
		if (searchQuery)
			filtered = allProducts.filter((m) =>
				m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
			);

		const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

		const prodcts = paginate(sorted, currentPage, pageSize);

		return {
			totalCount: filtered.length,
			data: prodcts,
		};
	};

	render() {
		const { user } = this.props;
		const { length: prodCount } = this.state.prodcts;
		const { pageSize, currentPage, sortColumn, searchQuery } = this.state;

		if (prodCount === 0) return <p>There are no products in the database.</p>;

		const { totalCount, data: prodcts } = this.getPagedData();

		return (
			<div className="container-fluid mt-4">
				{user && (
					<Link className="btn btn-primary mb-3" to="/products/new">
						New Product
					</Link>
				)}
				<p>Showing {totalCount} products in the database</p>
				<SearchBar value={searchQuery} onChange={this.handleSearch} />
				<ProductsTable
					products={prodcts}
					sortColumn={sortColumn}
					onLike={this.handleLike}
					onDelete={this.handleDelete}
					onSort={this.handleSort}
				/>
				<Pagination
					itemsCount={totalCount}
					pageSize={pageSize}
					currentPage={currentPage}
					onPageChange={this.handlePageChange}
				/>
			</div>
		);
	}
}

export default ProductsDash;
