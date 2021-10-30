import React, { Component } from "react";
import { Link } from "react-router-dom";
import _ from "lodash";
import { toast } from "react-toastify";
import {
  deleteProduct,
  getAllProducts,
  getProducts,
  makeProductListed,
} from "../../services/productService";
import Pagination from "../common/pagination";
import { paginate } from "../../utils/paginate";
import ProductsTable from "../product/productsTable";
import SearchBar from "../common/searchBar";
import authService from "../../services/authService";
import { Button } from "../common/buttons";
class ProductsDash extends Component {
  state = {
    products: [],
    currentPage: 1,
    pageSize: 4,
    searchQuery: "",
    sortColumn: { path: "title", order: "asc" },
  };

  async componentDidMount() {
    const { data: products } = await getAllProducts();
    this.setState({ products });
    console.log(products);
  }

  handleDelete = async (product) => {
    const originalProduct = this.state.products;
    const products = originalProduct.filter((m) => m._id !== product._id);
    this.setState({ products });
    try {
      await deleteProduct(product._id);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        toast.error("This product has already been deleted");
        this.setState({ products: originalProduct });
      }
    }
  };

  handleList = async (product) => {
    const originalProduct = this.state.products;
    // const products = originalProduct.filter((m) => m._id !== product._id);
    // this.setState({ products });
    try {
      await makeProductListed(product._id);
      const { data: products } = await getAllProducts();

      this.setState({ products });
    } catch (error) {
      if (error.response && error.response.status === 404) {
        toast.error("This product has already been deleted");
        this.setState({ products: originalProduct });
      }
    }
  };

  handleLike = (product) => {
    console.log(this.state.products);
    const products = [...this.state.products];
    const index = products.indexOf(product);
    products[index] = { ...products[index] };
    products[index].liked = !products[index].liked;
    this.setState({ products });
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
      products: allProducts,
    } = this.state;

    let filtered = allProducts;
    if (searchQuery)
      filtered = allProducts.filter((m) =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const products = paginate(sorted, currentPage, pageSize);

    return {
      totalCount: filtered.length,
      data: products,
    };
  };

  render() {
    const user = authService.getCurrentUser();
    const { length: prodCount } = this.state.products;
    const { pageSize, currentPage, sortColumn, searchQuery } = this.state;

    // if (prodCount === 0) return <p>There are no products in the database.</p>;

    const { totalCount, data: products } = this.getPagedData();

    return (
      <div>
        {user && (
          <Button as={Link} className="m-0 mb-3" to="/products/new">
            New Product
          </Button>
        )}
        {prodCount === 0 ? (
          <p>There are no products in the database.</p>
        ) : (
          <div>
            <p>Showing {totalCount} products in the database</p>
            <SearchBar value={searchQuery} onChange={this.handleSearch} />
            <ProductsTable
              products={products}
              sortColumn={sortColumn}
              onLike={this.handleLike}
              onDelete={this.handleDelete}
              onList={this.handleList}
              onSort={this.handleSort}
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

export default ProductsDash;
