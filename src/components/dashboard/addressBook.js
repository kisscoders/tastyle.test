import React, { Component } from "react";
import _ from "lodash";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { getMyAddresses, deleteAddress } from "../../services/orderService";
import Pagination from "../common/pagination";
import { paginate } from "../../utils/paginate";
import SearchBar from "../common/searchBar";
import Table from "../common/table";
import Like from "../common/like";

class AddressBook extends Component {
	state = {
		addresses: [],
		currentPage: 1,
		pageSize: 4,
		searchQuery: "",
		selectedGenre: null,
		sortColumn: { path: "title", order: "asc" },
	};

	columns = [
		{
			path: "firstName",
			label: "First Name",
			// content: (address) => (
			// 	<Link to={`/addresses/${address._id}`}>{address.product.title}</Link>
			// ),
		},
		{ path: "lastName", label: "Last Name" },
		{ path: "contactNo", label: "Contact No" },
		{ path: "addLine1", label: "Address" },
		{ path: "zipcode", label: "Zip Code" },
		{
			key: "like",
			content: (address) => (
				<Like liked={address.liked} onClick={() => this.props.onLike(address)} />
			),
		},
		{
			key: "delete",
			content: (order) => (
				<button
					onClick={() => this.props.onDelete(order)}
					className="btn btn-danger btn-sm"
				>
					Delete
				</button>
			),
		},
	];

	async componentDidMount() {
		// const { data } = await getGenres();
		// const genres = [{ _id: "", name: "All Genres" }, ...data];
		const addresses = await getMyAddresses();
		this.setState({ addresses });
	}

	handleDelete = async (address) => {
		const originaladdresses = this.state.addresses;
		const addresses = originaladdresses.filter((m) => m._id !== address._id);
		this.setState({ addresses });
		try {
			await deleteAddress(address._id);
		} catch (error) {
			if (error.response && error.response.status === 404) {
				toast.error("This address has already been deleted");
				this.setState({ addresses: originaladdresses });
			}
		}
	};

	handleLike = (movie) => {
		console.log(this.state.addresses);
		const addresses = [...this.state.addresses];
		const index = addresses.indexOf(movie);
		addresses[index] = { ...addresses[index] };
		addresses[index].liked = !addresses[index].liked;
		this.setState({ addresses });
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

	// handleGenreSelect = (genre) => {
	// 	this.setState({
	// 		selectedGenre: genre,
	// 		searchQuery: "",
	// 		currentPage: 1,
	// 	});
	// };

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
			addresses: allAddresses,
		} = this.state;

		let filtered = allAddresses;
		if (searchQuery)
			filtered = allAddresses.filter((o) =>
				o.title.toLowerCase().startsWith(searchQuery.toLowerCase())
			);
		// else if (selectedGenre && selectedGenre._id)
		// 	filtered = allAddresses.filter((o) => o.genre._id === selectedGenre._id);

		const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

		const addresses = paginate(sorted, currentPage, pageSize);

		return {
			totalCount: filtered.length,
			data: addresses,
		};
	};

	// constructor() {
	// 	super();
	// 	const user = authService.getCurrentUser();
	// 	if (user && user.role === "admin") this.columns.push(this.deleteColumn);
	// }
	render() {
		const { length: orderCount } = this.state.addresses;
		const { pageSize, currentPage, sortColumn, searchQuery } = this.state;

		if (orderCount === 0) return <p>There are no addresses in the database.</p>;

		const { totalCount, data: addresses } = this.getPagedData();

		return (
			<div className="container-fluid mt-4">
				{/* <div className="">
					<ListGroup
						items={this.state.genres}
						selectedItem={this.state.selectedGenre}
						onItemSelect={this.handleGenreSelect}
					/>
				</div> */}
				<div>
					<Link className="btn btn-primary mb-3" to="/addresses/new">
						New Address
					</Link>
					<p>Showing {totalCount} addresses from the database</p>
					<SearchBar value={searchQuery} onChange={this.handleSearch} />
					<Table
						columns={this.columns}
						data={addresses}
						sortColumn={sortColumn}
						onSort={this.handleSort}
						onLike={this.handleLike}
						onDelete={this.handleDelete}
					/>
					<Pagination
						itemsCount={totalCount}
						pageSize={pageSize}
						currentPage={currentPage}
						onPageChange={this.handlePageChange}
					/>
				</div>
			</div>
		);
	}
}

export default AddressBook;
