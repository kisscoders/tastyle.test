import React, { Component } from "react";
import _ from "lodash";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  deleteOrder,
  getMyHistoryOrders,
  getMyOrders,
  getMyPendingOrders,
} from "../../services/orderService";
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
    pendingOrders: [],
    historyOrders: [],
    currentPage: 1,
    pageSize: 4,
    searchQueryPending: "",
    searchQueryHistory: "",
    selectedGenre: null,
    sortColumn: { path: "title", order: "asc" },
  };

  async componentDidMount() {
    const orders = await getMyOrders();
    const pendingOrders = await getMyPendingOrders();
    const historyOrders = await getMyHistoryOrders();
    this.setState({ orders });
    this.setState({ pendingOrders });
    this.setState({ historyOrders });
  }

  handleCancel = async (order) => {
    const originalOrders = this.state.pendingOrders;
    const pendingOrders = originalOrders.filter((m) => m._id !== order._id);
    this.setState({ pendingOrders });
    try {
      await deleteOrder(order._id);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        toast.error("This order has already been deleted");
        this.setState({ pendingOrders: originalOrders });
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
      searchQueryPending: query,
      selectedGenre: null,
      currentPage: 1,
    });
  };

  columnsPending = [
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

  columnsHistory = [
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
  // 		searchQueryPending: "",
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
      searchQueryPending,
      pendingOrders: allPendingOrders,
      historyOrders: allHistoryOrders,
    } = this.state;

    let filteredPending = allPendingOrders;
    if (searchQueryPending)
      filteredPending = allPendingOrders.filter((o) =>
        o.title.toLowerCase().startsWith(searchQueryPending.toLowerCase())
      );
    // else if (selectedGenre && selectedGenre._id)
    // 	filteredPending = allPendingOrders.filter((o) => o.genre._id === selectedGenre._id);

    const sorted1 = _.orderBy(
      filteredPending,
      [sortColumn.path],
      [sortColumn.order]
    );

    const pendingOrders = paginate(sorted1, currentPage, pageSize);

    let filteredHistory = allHistoryOrders;
    if (searchQueryPending)
      filteredHistory = allHistoryOrders.filter((o) =>
        o.title.toLowerCase().startsWith(searchQueryPending.toLowerCase())
      );
    // else if (selectedGenre && selectedGenre._id)
    // 	filteredHistory = allPendingOrders.filter((o) => o.genre._id === selectedGenre._id);

    const sorted2 = _.orderBy(
      filteredHistory,
      [sortColumn.path],
      [sortColumn.order]
    );

    const historyOrders = paginate(sorted2, currentPage, pageSize);

    return {
      totalCountPending: filteredPending.length,
      dataPending: pendingOrders,
      totalCountHistory: filteredHistory.length,
      dataHistory: historyOrders,
    };
  };
  constructor() {
    super();
    const user = authService.getCurrentUser();
    if (user && user.role === "admin")
      this.columnsPending.push(this.deleteColumn);
  }

  render() {
    // const { length: orderCount } = this.state.pendingOrders;
    const { pageSize, currentPage, sortColumn, searchQueryPending } =
      this.state;

    const {
      totalCountPending,
      dataPending: pendingOrders,
      totalCountHistory,
      dataHistory: historyOrders,
    } = this.getPagedData();

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
          New Purchase
        </Button>
        {totalCountPending === 0 ? (
          <p>It seems you haven't made any Purchases ?</p>
        ) : (
          <div>
            <div>
              <p>
                You've {totalCountPending} Purchases under Process... Horray!!!
              </p>
              <SearchBar
                value={searchQueryPending}
                onChange={this.handleSearch}
              />
              <Table
                columns={this.columnsPending}
                data={pendingOrders}
                sortColumn={sortColumn}
                onDelete={this.handleCancel}
                onSort={this.handleSort}
              />
              <Pagination
                itemsCount={totalCountPending}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={this.handlePageChange}
              />
            </div>
            <div>
              <h3>Purchase History</h3>
              <SearchBar
                value={searchQueryPending}
                onChange={this.handleSearch}
              />
              <Table
                columns={this.columnsHistory}
                data={historyOrders}
                sortColumn={sortColumn}
                onDelete={this.handleCancel}
                onSort={this.handleSort}
              />
              <Pagination
                itemsCount={totalCountHistory}
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
