import React, { Component } from "react";
import _ from "lodash";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  deleteOrder,
  getOrders,
  makeOrderDelivered,
} from "../../services/orderService";
// import { getGenres } from "../../services/genreService";
import Pagination from "../common/pagination";
import { paginate } from "../../utils/paginate";
// import ListGroup from "../common/listGroup";
import OrdersTable from "../order/ordersTable";
import SearchBar from "../common/searchBar";
import { Button } from "../common/buttons";
import { getCurrentUser } from "../../services/authService";

class OrdersDash extends Component {
  state = {
    orders: [],
    currentPage: 1,
    pageSize: 4,
    searchQuery: "",
    selectedGenre: null,
    sortColumn: { path: "title", order: "asc" },
    totalCount: 0,
  };

  async componentDidMount() {
    // const { data } = await getGenres();
    // const genres = [{ _id: "", name: "All Genres" }, ...data];
    const orders = await getOrders();
    this.setState({ totalCount: orders.length });
    this.setState({ orders });
    // console.log(orders);
  }

  handleDelete = async (order) => {
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

  handleDeliver = async (order) => {
    // const originalOrders = this.state.orders;
    // const orders = originalOrders.filter((m) => m._id !== order._id);
    // this.setState({ orders });
    try {
      await makeOrderDelivered(order._id);
      const { orders } = await getOrders();
      this.setState({ orders });
    } catch (error) {
      if (error.response && error.response.status === 404) {
        toast.error("This product has already been deleted");
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
      data: orders,
    };
  };

  render() {
    // const user = getCurrentUser();
    const { pageSize, currentPage, sortColumn, searchQuery, totalCount } =
      this.state;

    const { data: orders } = this.getPagedData();

    return (
      // {/* <div className="">
      // 	<ListGroup
      // 		items={this.state.genres}
      // 		selectedItem={this.state.selectedGenre}
      // 		onItemSelect={this.handleGenreSelect}
      // 	/>
      // </div> */}

      <div className="">
        {totalCount === 0 ? (
          <p>There are no orders in the database.</p>
        ) : (
          <div>
            <p>Showing {totalCount} orders from the database</p>
            <SearchBar value={searchQuery} onChange={this.handleSearch} />
            <OrdersTable
              orders={orders}
              sortColumn={sortColumn}
              onDelete={this.handleDelete}
              onSort={this.handleSort}
              onDeliver={this.handleDeliver}
            />
            <Pagination
              itemsCount={totalCount}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={this.handlePageChange}
            />
          </div>
        )}
      </div>
    );
  }
}

export default OrdersDash;
