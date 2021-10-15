import React, { Component } from "react";
import _ from "lodash";
import { toast } from "react-toastify";
import { getMyAddresses, deleteAddress } from "../../services/orderService";
import { paginate } from "../../utils/paginate";

import Pagination from "../common/pagination";
import SearchBar from "../common/searchBar";
import Table from "../common/table";
import { TextInput } from "../common/inputs";
import { Button } from "../common/buttons";
import { Card1, CardBody1, CardHeader1 } from "../common/cards";
class AddressBook extends Component {
  state = {
    addresses: [],
    currentPage: 1,
    pageSize: 4,
    searchQuery: "",
    sortColumn: { path: "title", order: "asc" },
    data: {},
    errors: {},
  };

  columns = [
    {
      path: "firstName",
      label: "Name",
      // content: (address) => (
      // 	<Link to={`/addresses/${address._id}`}>{address.product.title}</Link>
      // ),
    },
    { path: "contactNo", label: "Contact" },
    { path: "city", label: "City" },
    { path: "zipcode", label: "Zip" },
    // {
    // 	key: "like",
    // 	content: (address) => (
    // 		<Like liked={address.liked} onClick={() => this.props.onLike(address)} />
    // 	),
    // },
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

  // handleLike = (movie) => {
  // 	console.log(this.state.addresses);
  // 	const addresses = [...this.state.addresses];
  // 	const index = addresses.indexOf(movie);
  // 	addresses[index] = { ...addresses[index] };
  // 	addresses[index].liked = !addresses[index].liked;
  // 	this.setState({ addresses });
  // };

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
  renderInput(name, label, type = "text") {
    const { data, errors } = this.state;
    return (
      <TextInput
        type={type}
        name={name}
        value={data[name]}
        label={label}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }
  renderButton(label) {
    return <Button className="mt-2">{label}</Button>;
  }

  // doSubmit = async () => {
  // 	console.log(this.state.data);
  // 	await saveMovie(this.state.data);
  // 	// Call the server
  // 	this.props.history.push("/movies");
  // 	let changedTitle = this.state.data.title;
  // 	console.log("Submitted", changedTitle);
  // 	toast("Updated");
  // };

  // constructor() {
  // 	super();
  // 	const user = authService.getCurrentUser();
  // 	if (user && user.role === "admin") this.columns.push(this.deleteColumn);
  // }
  render() {
    const { length: orderCount } = this.state.addresses;
    const { pageSize, currentPage, sortColumn, searchQuery } = this.state;

    const { totalCount, data: addresses } = this.getPagedData();

    return (
      // <div className="container-fluid mt-4">
      // 	{/* <div className="">
      // 		<ListGroup
      // 			items={this.state.genres}
      // 			selectedItem={this.state.selectedGenre}
      // 			onItemSelect={this.handleGenreSelect}
      // 		/>
      // 	</div> */}
      <div className="row">
        {/* <Button as={Link} className="m-0 mb-3" to="/addresses/new">
					New Address
				</Button> */}
        <div className="col col-6">
          {orderCount === 0 ? (
            <Card1>
              <CardHeader1 as="h6">
                You haven't added any addresses, you're pretty anonymous!
              </CardHeader1>
            </Card1>
          ) : (
            <Card1>
              <CardHeader1 as="h6">
                You've {totalCount} Addresses. Have Fun!!!
              </CardHeader1>
              <CardBody1>
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
              </CardBody1>
            </Card1>
          )}
        </div>
        <div className="col col-6">
          <Card1>
            <CardHeader1 as="h5">Add an Address</CardHeader1>
            <CardBody1>
              <form onSubmit={""}>
                {this.renderInput("productName", "Pla")}
                {this.renderInput("user", "Customer")}
                {this.renderInput("price", "Price")}
                {this.renderInput("quantityVar", "Quantity")}
                {/* {this.renderInput("deliverTo", "Delivery Address")} */}
                {this.renderInput("orderStatus", "We are currently")}
                {this.renderButton("Add")}
              </form>
            </CardBody1>
          </Card1>
        </div>
      </div>
    );
  }
}

export default AddressBook;
