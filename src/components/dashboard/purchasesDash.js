import React, { Component } from "react";
import _ from "lodash";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteOrder, getMyOrders } from "../../services/orderService";
import Pagination from "../common/pagination";
import Table from "../common/table";
import SearchBar from "../common/searchBar";
import { Button } from "../common/buttons";
import authService from "../../services/authService";
import { getDisplayData } from "../../utils/manageData";

class PurchasesDash extends Component {
  state = {
    ordersPending: [],
    table1CurrentPage: 1,
    table1PageSize: 4,
    table1SearchQuery: "",
    table1SortColumn: { path: "title", order: "asc" },
    ordersHistory: [],
    table2CurrentPage: 1,
    table2PageSize: 4,
    table2SearchQuery: "",
    table2SortColumn: { path: "title", order: "asc" },
  };

  async componentDidMount() {
    const ordersPending = await getMyOrders("pending");
    const ordersHistory = await getMyOrders("history");
    this.setState({ ordersPending });
    this.setState({ ordersHistory });
  }

  // handlers

  handleCancel = async (order) => {
    const originalOrders = this.state.ordersPending;
    const ordersPending = originalOrders.filter((m) => m._id !== order._id);
    this.setState({ ordersPending });
    try {
      await deleteOrder(order._id);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        toast.error("This order has already been deleted");
        this.setState({ ordersPending: originalOrders });
      }
    }
  };

  handlePageChange = (page, variant) => {
    variant === "table1" && this.setState({ table1CurrentPage: page });
    variant === "table2" && this.setState({ table2CurrentPage: page });
  };

  handleSearch = (query, variant) => {
    variant === "table1" &&
      this.setState({
        table1SearchQuery: query,
        table1CurrentPage: 1,
      });
    variant === "table2" &&
      this.setState({
        table2SearchQuery: query,
        table2CurrentPage: 1,
      });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  // Columns

  table1Columns = [
    {
      path: "product.title",
      label: "Product",
    },
    { path: "priceSum", label: "Price" },
    { path: "orderType", label: "Type" },
    { path: "orderStatus", label: "Status" },
  ];

  table2Columns = [
    {
      path: "product.title",
      label: "Product",
    },
    { path: "priceSum", label: "Price" },
    { path: "orderType", label: "Type" },
    { path: "orderStatus", label: "Status" },
  ];

  // cancelColumn = {
  //   key: "delete",
  //   content: (order) => (
  //     <button
  //       onClick={() => this.props.onDelete(order)}
  //       className="btn btn-danger btn-sm"
  //     >
  //       Cancel
  //     </button>
  //   ),
  // };

  // constructor() {
  //   super();
  //   const user = authService.getCurrentUser();
  //   if (user && user.role === "admin")
  //     this.table1Columns.push(this.cancelColumn);
  // }

  render() {
    const {
      table1PageSize,
      table1CurrentPage,
      table1SortColumn,
      table1SearchQuery,
      table2PageSize,
      table2CurrentPage,
      table2SortColumn,
      table2SearchQuery,
      ordersPending,
      ordersHistory,
    } = this.state;

    const { table1Columns, table2Columns } = this;

    const {
      actualCount: actualCount1,
      totalCount: totalCount1,
      outputData: data1,
    } = getDisplayData(
      table1PageSize,
      table1CurrentPage,
      table1SortColumn,
      table1SearchQuery,
      "product.title",
      ordersPending
    );

    const {
      actualCount: actualCount2,
      totalCount: totalCount2,
      outputData: data2,
    } = getDisplayData(
      table2PageSize,
      table2CurrentPage,
      table2SortColumn,
      table2SearchQuery,
      "product.title",
      ordersHistory
    );

    return (
      <div className="">
        <Button as={Link} className="m-0 mb-3" to="/orders/new">
          New Purchase
        </Button>
        <h3>Pending Purchases</h3>
        {actualCount1 === 0 ? (
          <p>It seems you haven't made any Purchases ?</p>
        ) : (
          <div>
            <p>You've {actualCount1} Purchases under Process... Horray!!!</p>
            <SearchBar
              value={table1SearchQuery}
              variant="table1"
              onChange={this.handleSearch}
            />
            <Table
              columns={table1Columns}
              data={data1}
              sortColumn={table1SortColumn}
              onDelete={this.handleCancel}
              onSort={this.handleSort}
            />
            <Pagination
              itemsCount={totalCount1}
              pageSize={table1PageSize}
              currentPage={table1CurrentPage}
              onPageChange={this.handlePageChange}
              variant="table2"
            />
          </div>
        )}
        <h3>Purchase History</h3>
        {actualCount2 === 0 ? (
          <p>It seems you haven't made any Purchases ?</p>
        ) : (
          <div>
            <div>
              <p>You've {actualCount2} Purchases under Process... Horray!!!</p>
              <SearchBar
                variant="table2"
                value={table2SearchQuery}
                onChange={this.handleSearch}
              />
              <Table
                columns={table2Columns}
                data={data2}
                sortColumn={table2SortColumn}
                onDelete={this.handleCancel}
                onSort={this.handleSort}
              />
              <Pagination
                itemsCount={totalCount2}
                pageSize={table2PageSize}
                currentPage={table2CurrentPage}
                onPageChange={this.handlePageChange}
                variant="table2"
              />
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default PurchasesDash;
