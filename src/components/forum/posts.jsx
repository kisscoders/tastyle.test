import React from "react";
import { toast } from "react-toastify";
import http from "../../services/httpService";
import config from "../../config.json";

class Posts extends React.Component {
	state = {
		posts: [],
	};

	async componentDidMount() {
		const { data: posts } = await http.get(config.apiEndpoint);
		this.setState({ posts });
	}

	handleAdd = async () => {
		const obj = { title: "a", body: "b" };
		const { data: post } = await http.post(config.apiEndpoint, obj);
		console.log("Added", post);

		const posts = [post, ...this.state.posts];
		this.setState({ posts });
	};

	handleUpdate = async (post) => {
		post.title = "UPDATED";
		await http.put(config.apiEndpoint + "/" + post.id, post);
		// http.patch(config.apiEndpoint + "/" + post.id, { title: post.title });
		const posts = [...this.state.posts];
		const index = posts.indexOf(post);
		posts[index] = { ...post };
		this.setState({ posts });
	};

	handleDelete = async (post) => {
		const originalPosts = this.state.posts;

		const posts = this.state.posts.filter((p) => p.id !== post.id);
		this.setState({ posts });
		// for expected errors we write function below to do something specific to fix a failure
		try {
			await http.delete(config.apiEndpoint + "/" + post.id, post);
		} catch (error) {
			if (error.response && error.response.status === 404)
				toast.error("This post has already been deleted");
			this.setState({ posts: originalPosts });
		}
	};

	render() {
		const { posts } = this.state;
		return (
			<div>
				<h1>Posts</h1>
				<button className="btn btn-primary" onClick={() => this.handleAdd()}>
					Add
				</button>
				<table className="table my-3">
					<thead>
						<tr>
							<th scope="col">Title</th>
							<th scope="col">Update</th>
							<th scope="col">Delete</th>
						</tr>
					</thead>
					<tbody>
						{posts.map((post) => (
							<tr key={post.title}>
								<td>{post.title}</td>
								<td>
									<button
										className="btn btn-info btn-sm"
										onClick={() => this.handleUpdate(post)}
									>
										Update
									</button>
								</td>
								<td>
									<button
										className="btn btn-danger btn-sm"
										onClick={() => this.handleDelete(post)}
									>
										Delete
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		);
	}
}

export default Posts;

// import queryString from "query-string";

// const Posts = ({ match, location }) => {
//   // const result = queryString.parse(location.search);
//   // console.log(result);
//   return (
//     <div>
//       <h1>Posts</h1>
//       Year: {match.params.year} , Month: {match.params.month}
//     </div>
//   );
// };

// export default Posts;
