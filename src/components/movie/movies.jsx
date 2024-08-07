import React, { Component } from "react";
import _ from "lodash";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteMovie, getMovies } from "../../services/movieService";
import { getGenres } from "../../services/genreService";
import Pagination from "../common/pagination";
import { paginate } from "../../utils/paginate";
import ListGroup from "../common/listGroup";
import MoviesTable from "./moviesTable";
import SearchBar from "../common/searchBar";

class Movies extends Component {
	state = {
		movies: [],
		genres: [],
		currentPage: 1,
		pageSize: 4,
		searchQuery: "",
		selectedGenre: null,
		sortColumn: { path: "title", order: "asc" },
	};

	async componentDidMount() {
		const { data } = await getGenres();
		const genres = [{ _id: "", name: "All Genres" }, ...data];

		const { data: movies } = await getMovies();
		this.setState({ movies, genres });
	}

	handleDelete = async (movie) => {
		const originalMovies = this.state.movies;
		const movies = originalMovies.filter((m) => m._id !== movie._id);
		this.setState({ movies });
		try {
			await deleteMovie(movie._id);
		} catch (error) {
			if (error.response && error.response.status === 404) {
				toast.error("This movie has already been deleted");
				this.setState({ movies: originalMovies });
			}
		}
	};

	handleLike = (movie) => {
		console.log(this.state.movies);
		const movies = [...this.state.movies];
		const index = movies.indexOf(movie);
		movies[index] = { ...movies[index] };
		movies[index].liked = !movies[index].liked;
		this.setState({ movies });
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

	handleGenreSelect = (genre) => {
		this.setState({
			selectedGenre: genre,
			searchQuery: "",
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
			selectedGenre,
			searchQuery,
			movies: allMovies,
		} = this.state;

		let filtered = allMovies;
		if (searchQuery)
			filtered = allMovies.filter((m) =>
				m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
			);
		else if (selectedGenre && selectedGenre._id)
			filtered = allMovies.filter((m) => m.genre._id === selectedGenre._id);

		const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

		const movies = paginate(sorted, currentPage, pageSize);

		return {
			totalCount: filtered.length,
			data: movies,
		};
	};
	render() {
		const { user } = this.props;
		const { length: movCount } = this.state.movies;
		const { pageSize, currentPage, sortColumn, searchQuery } = this.state;

		if (movCount === 0) return <p>There are no movies in the database.</p>;

		const { totalCount, data: movies } = this.getPagedData();

		return (
			<div className="container-fluid mt-4">
				<div className="">
					<ListGroup
						items={this.state.genres}
						selectedItem={this.state.selectedGenre}
						onItemSelect={this.handleGenreSelect}
					/>
				</div>
				<div className="">
					{user && (
						<Link className="btn btn-primary mb-3" to="/movies/new">
							New Movie
						</Link>
					)}
					<p>Showing {totalCount} movies in the database</p>
					<SearchBar value={searchQuery} onChange={this.handleSearch} />
					<MoviesTable
						movies={movies}
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
			</div>
		);
	}
}

export default Movies;
