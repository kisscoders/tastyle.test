import React, { Component } from "react";
import _ from "lodash";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteOrder, getMyOrders } from "../../services/orderService";
import Pagination from "../common/pagination";
import { paginate } from "../../utils/paginate";
// import ListGroup from "../common/listGroup";
import Table from "../common/table";
import SearchBar from "../common/searchBar";
import { Button } from "../common/buttons";
import authService from "../../services/authService";

class PurchasesDash extends Component {
  state = {
    orders: [],
    currentPage: 1,
    pageSize: 4,
    searchQuery: "",
    selectedGenre: null,
    sortColumn: { path: "title", order: "asc" },
  };

  async componentDidMount() {
    const orders = await getMyOrders();
    this.setState({ orders });
  }

  handleCancel = async (order) => {
    const originalOrders = this.state.orders;
    const orders = originalOrders.filter((m) => m._id !== order._id);
    this.setState({ orders });
    try {
      await deleteOrder(order._id);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        toast.error("This order has already been deleted");
        this.setState({ orders: originalOrders });
      }
    }
  };

  // handleLike = (movie) => {
  // 	console.log(this.state.orders);
  // 	const orders = [...this.state.orders];
  // 	const index = orders.indexOf(movie);
  // 	orders[index] = { ...orders[index] };
  // 	orders[index].liked = !orders[index].liked;
  // 	this.setState({ orders });
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

  columns1 = [
    {
      path: "product.title",
      label: "Product",
      // content: (order) => (
      // 	<Link to={`/orders/${order._id}`}>{order.product.title}</Link>
      // ),
    },
    // { path: "user.name", label: "Customer" },
    { path: "priceSum", label: "Price" },
    { path: "orderType", label: "Type" },
    { path: "orderStatus", label: "Status" },
  ];

  columns2 = [
    {
      path: "product.title",
      label: "Product",
      // content: (order) => (
      // 	<Link to={`/orders/${order._id}`}>{order.product.title}</Link>
      // ),
    },
    // { path: "user.name", label: "Customer" },
    { path: "priceSum", label: "Price" },
    { path: "orderType", label: "Type" },
    { path: "orderStatus", label: "Status" },
  ];

  deleteColumn = {
    key: "delete",
    content: (order) => (
      <button
        onClick={() => this.props.onDelete(order)}
        className="btn btn-danger btn-sm"
      >
        Cancel
      </button>
    ),
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
      orders: allOrders,
    } = this.state;

    let filtered = allOrders;
    if (searchQuery)
      filtered = allOrders.filter((o) =>
        o.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    // else if (selectedGenre && selectedGenre._id)
    // 	filtered = allOrders.filter((o) => o.genre._id === selectedGenre._id);

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const orders = paginate(sorted, currentPage, pageSize);

    return {
      totalCount: filtered.length,
      data: orders,
    };
  };
  constructor() {
    super();
    const user = authService.getCurrentUser();
    if (user && user.role === "admin") this.columns1.push(this.deleteColumn);
  }

  render() {
    const { length: orderCount } = this.state.orders;
    const { pageSize, currentPage, sortColumn, searchQuery } = this.state;

    const { totalCount, data: orders } = this.getPagedData();

    return (
      // {/* <div className="">
      // 	<ListGroup
      // 		items={this.state.genres}
      // 		selectedItem={this.state.selectedGenre}
      // 		onItemSelect={this.handleGenreSelect}
      // 	/>
      // </div> */}
      <div className="">
        <Button as={Link} className="m-0 mb-3" to="/orders/new">
          New Order
        </Button>
        {orderCount === 0 ? (
          <p>It seems you haven't made any Purchases ?</p>
        ) : (
          <div>
            <div>
              <p>You've {totalCount} Purchases under Process... Horray!!!</p>
              <SearchBar value={searchQuery} onChange={this.handleSearch} />
              <Table
                columns={this.columns1}
                data={orders}
                sortColumn={sortColumn}
                onDelete={this.handleCancel}
                onSort={this.handleSort}
              />
              <Pagination
                itemsCount={totalCount}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={this.handlePageChange}
              />
            </div>
            <div>
              <h3>Purchase History</h3>
              <SearchBar value={searchQuery} onChange={this.handleSearch} />
              <Table
                columns={this.columns2}
                data={orders}
                sortColumn={sortColumn}
                onDelete={this.handleCancel}
                onSort={this.handleSort}
              />
              <Pagination
                itemsCount={totalCount}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={this.handlePageChange}
              />
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default PurchasesDash;
