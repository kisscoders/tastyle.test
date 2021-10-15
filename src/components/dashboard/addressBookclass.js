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

// import React, { useEffect, useState } from "react";
// import _ from "lodash";
// import { toast } from "react-toastify";
// import {
//   getMyAddresses,
//   deleteAddress,
//   saveAddress,
//   getAddress,
// } from "../../services/orderService";
// import { paginate } from "../../utils/paginate";

// import Pagination from "../common/pagination";
// import Table from "../common/table";
// import { TextInput } from "../common/inputs";
// import { Button } from "../common/buttons";
// import { Card1, CardBody1, CardHeader1 } from "../common/cards";

// const AddressBook = () => {
//   const [addresses, setAddresses] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [pageSize, setPageSize] = useState(4);
//   const [sortColumn, setSortColumn] = useState({ path: "title", order: "asc" });
//   const [data, setData] = useState({
//     nickName: "",
//     contactNo: "",
//     addLine1: "",
//     addLine2: "",
//     city: "",
//     zipcode: "",
//     landmarks: "",
//   });
//   const [errors, setErrors] = useState({});

//   // const schema = {
//   //   _id: Joi.string(),
//   //   title: Joi.string().required().label("Title"),
//   //   genreId: Joi.string().required().label("Genre"),
//   //   numberInStock: Joi.number()
//   //     .min(0)
//   //     .max(100)
//   //     .required()
//   //     .label("Number in Stock"),
//   //   dailyRentalRate: Joi.number()
//   //     .min(0)
//   //     .max(10)
//   //     .required()
//   //     .label("Daily Rental Rate"),
//   // };

//   const columns = [
//     { path: "firstName", label: "Name" },
//     { path: "contactNo", label: "Contact" },
//     { path: "city", label: "City" },
//     { path: "zipcode", label: "Zip" },
//   ];

//   useEffect(() => {
//     getData();
//     toast("addressbook useEffect executed!");
//     addresses.filter((o) => {
//       console.log(o);
//     });
//   }, []);

//   const getData = async () => {
//     const getaddresses = await getMyAddresses();
//     setAddresses(getaddresses);
//   };

//   const populateForm = async () => {
//     try {
//       const movieId = this.props.match.params.id;

//       const { data: movie } = await getAddress(movieId);
//       this.setState({
//         data: mapToViewModel(movie),
//       });
//     } catch (error) {
//       if (error.response && error.response.status === 404)
//         // this.props.history.replace("/not-found");
//         toast.error("error ocurred on populating");
//     }
//   };
//   const mapToViewModel = (data) => {
//     return {
//       _id: data._id,
//       nickName: data.nickName,
//       contactNo: data.contactNo,
//       addLine1: data.addLine1,
//       addLine2: data.addLine2,
//       city: data.city,
//       zipcode: data.zipcode,
//       landmarks: data.landmarks,
//     };
//   };

//   const handleDelete = async (address) => {
//     const backup = addresses;
//     const filter = addresses.filter((m) => m._id !== address._id);
//     setAddresses(filter);
//     try {
//       await deleteAddress(address._id);
//     } catch (error) {
//       if (error.response && error.response.status === 404) {
//         toast.error("This address has already been deleted");
//         setAddresses(backup);
//       }
//     }
//   };

//   const doSubmit = async () => {
//     console.log(data);
//     await saveAddress(data);
//     toast("Updated");
//   };

//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//   };

//   const handleSort = (sortColumn) => {
//     setSortColumn(sortColumn);
//   };

//   const getPagedData = () => {
//     const all = addresses;

//     const sorted = _.orderBy(all, [sortColumn.path], [sortColumn.order]);

//     const displayData = paginate(sorted, currentPage, pageSize);

//     return {
//       displayData,
//     };
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // const err = validate();
//     // setErrors(err || {});
//     // if (err) return;

//     doSubmit();
//   };

//   const handleChange = ({ currentTarget: input }) => {
//     // const errorMessage = this.validateProperty(input);
//     // if (errorMessage) errors[input.name] = errorMessage;
//     // else delete errors[input.name];
//     const type = { ...data };
//     type[input.name] = input.value;

//     setData(type);
//   };

//   const renderInput = (name, label, type = "text") => {
//     return (
//       <TextInput
//         type={type}
//         name={name}
//         value={data[name]}
//         label={label}
//         onChange={handleChange}
//         error={errors[name]}
//       />
//     );
//   };

//   const renderButton = (label) => {
//     return <Button className="mt-2">{label}</Button>;
//   };

//   const totalCount = addresses.length;

//   const { displayData } = getPagedData();
//   return (
//     <div className="row">
//       <div className="col col-6">
//         {totalCount === 0 ? (
//           <Card1>
//             <CardHeader1 as="h6">
//               You haven't added any addresses, you're pretty anonymous!
//             </CardHeader1>
//           </Card1>
//         ) : (
//           <Card1>
//             <CardHeader1 as="h6">
//               {totalCount === 1 ? (
//                 <>You've added an address!</>
//               ) : (
//                 <>You've added {totalCount} addresses. Have Fun!!!</>
//               )}
//             </CardHeader1>
//             <CardBody1>
//               <Table
//                 columns={columns}
//                 data={displayData}
//                 sortColumn={sortColumn}
//                 onSort={handleSort}
//                 onDelete={handleDelete}
//               />
//               <Pagination
//                 itemsCount={totalCount}
//                 pageSize={pageSize}
//                 currentPage={currentPage}
//                 onPageChange={handlePageChange}
//               />
//             </CardBody1>
//           </Card1>
//         )}
//       </div>
//       <div className="col col-6">
//         <Card1>
//           <CardHeader1 as="h5">Add an Address</CardHeader1>
//           <CardBody1>
//             <form onSubmit={handleSubmit}>
//               {renderInput("nickName", "What do we call you?")}
//               {renderInput("contactNo", "Contact Number")}
//               {renderInput("addLine1", "Address Line 1")}
//               {renderInput("addLine2", "Address Line 2")}
//               {renderInput("city", "City")}
//               {renderInput("zipcode", "Zip Code")}
//               {renderInput("landmarks", "Landmarks")}
//               {renderButton("Save")}
//             </form>
//           </CardBody1>
//         </Card1>
//       </div>
//     </div>
//   );
// };

// export default AddressBook;
