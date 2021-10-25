import React, { Component } from "react";
import _ from "lodash";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  getAllUsers,
  deleteUser,
  roleChange,
} from "../../services/authService";
import Pagination from "../common/pagination";
import { paginate } from "../../utils/paginate";
import SearchBar from "../common/searchBar";
import Table from "../common/table";

class UsersDash extends Component {
  state = {
    users: [],
    currentPage: 1,
    pageSize: 4,
    searchQuery: "",
    sortColumn: { path: "title", order: "asc" },
  };

  columns = [
    {
      path: "avatar.url",
      content: (user) =>
        user.avatar && (
          <img
            className="rounded-circle"
            src={user.avatar.url}
            alt="profile"
            width="30"
          />
        ),
    },
    {
      path: "name",
      label: "Name",
      // content: (user) => <Link to={`/users/${user._id}`}>{user.name}</Link>,
    },
    { path: "email", label: "Email" },
    { path: "role", label: "Role" },
    {
      key: "delete",
      content: (user) => (
        <button
          onClick={() => this.handleDelete(user)}
          className="btn btn-danger btn-sm"
        >
          Delete
        </button>
      ),
    },
    {
      key: "promote",
      content: (user) => (
        <button
          onClick={() => this.handlePromote(user)}
          className="btn btn-success btn-sm"
        >
          Promote
        </button>
      ),
    },
  ];

  async componentDidMount() {
    // const { data } = await getGenres();
    // const genres = [{ _id: "", name: "All Genres" }, ...data];
    // const users = await getAllUsers();
    // // console.log(users);
    // this.setState({ users });
    this.populateUsers();
  }
  populateUsers = async () => {
    const users = await getAllUsers();
    // console.log(users);
    this.setState({ users });
  };

  handleDelete = async (user) => {
    const originalUsers = this.state.users;
    const users = originalUsers.filter((m) => m._id !== user._id);
    this.setState({ users });
    try {
      await deleteUser(user._id);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        toast.error("This user has already been deleted");
        this.setState({ users: originalUsers });
      }
    }
  };

  handlePromote = async (user) => {
    const originalUsers = this.state.users;
    // const users = originalUsers.filter((m) => m._id !== user._id);
    // this.setState({ users });
    try {
      await roleChange(user._id);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        toast.error("This user has already been deleted");
        this.setState({ users: originalUsers });
      }
    }
  };

  handleLike = (user) => {
    console.log(this.state.users);
    const users = [...this.state.users];
    const index = users.indexOf(user);
    users[index] = { ...users[index] };
    users[index].liked = !users[index].liked;
    this.setState({ users });
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
      users: allUsers,
    } = this.state;

    let filtered = allUsers;
    if (searchQuery)
      filtered = allUsers.filter((o) =>
        o.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    // else if (selectedGenre && selectedGenre._id)
    // 	filtered = allusers.filter((o) => o.genre._id === selectedGenre._id);

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const users = paginate(sorted, currentPage, pageSize);

    return {
      totalCount: filtered.length,
      data: users,
    };
  };

  // constructor() {
  // 	super();
  // 	const user = authService.getCurrentUser();
  // 	if (user && user.role === "admin") this.columns.push(this.deleteColumn);
  // }
  render() {
    const { length: orderCount } = this.state.users;
    const { pageSize, currentPage, sortColumn, searchQuery } = this.state;

    if (orderCount === 0) return <p>There are no users in the database.</p>;

    const { totalCount, data: users } = this.getPagedData();

    return (
      // {/* <div className="">
      // 	<ListGroup
      // 		items={this.state.genres}
      // 		selectedItem={this.state.selectedGenre}
      // 		onItemSelect={this.handleGenreSelect}
      // 	/>
      // </div> */}
      <div>
        {/* <Button as={Link} className="m-0 mb-3" to="/users/new">
					New User
				</Button>
					<Link className="btn btn-primary mb-3" to="/users/new">
						New User
					</Link> */}
        <p>Showing {totalCount} users from the database</p>
        <SearchBar value={searchQuery} onChange={this.handleSearch} />
        <Table
          columns={this.columns}
          data={users}
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
    );
  }
}

export default UsersDash;
