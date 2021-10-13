import React, { Component } from "react";
import _ from "lodash";
import { getProducts } from "../../services/productService";
import { Card, Row, Col } from "react-bootstrap";
import { Container } from "react-bootstrap";

class ProductsGrid extends Component {
	// columns = [
	// 	{
	// 		path: "title",
	// 		content: (product) => (
	// 			<Link to={`/products/${product._id}`}>{product.title}</Link>
	// 		),
	// 	},
	// 	{ path: "price", label: "Price" },
	// 	{ path: "category", label: "Category" },
	// 	{ path: "description", label: "Description" },
	// 	{ path: "img", label: "Image" },
	// 	// { path: "cloudinary_id", label: "cloudinary" },
	// 	// {
	// 	// 	key: "like",
	// 	// 	content: (product) => (
	// 	// 		<Like liked={product.liked} onClick={() => this.props.onLike(product)} />
	// 	// 	),
	// 	// },
	// 	{
	// 		key: "image",
	// 		content: (product) => <image src={product.img} />,
	// 	},
	// 	{
	// 		key: "Des",
	// 		content: (product) => <Link to={`/products/d/${product._id}`}>Buy Now</Link>,
	// 	},
	// ];

	state = {
		products: [],
		currentPage: 1,
		pageSize: 4,
		searchQuery: "",
		sortColumn: { path: "title", order: "asc" },
	};

	async componentDidMount() {
		const { data: products } = await getProducts();
		this.setState({ products });
	}
	handlePageChange = (page) => {
		this.setState({ currentPage: page });
	};
	renderField = (item, column) => {
		if (column.content) return column.content(item);

		return _.get(item, column.path);
	};
	createKey = (item, column) => {
		return item._id + (column.path || column.key);
	};

	render() {
		const { products } = this.state;

		return (
			<Container>
				<Row md={"auto"} className="g-4">
					{products.map((item) => (
						<Col>
							<Card key={item._id} border="primary" style={{ width: "18rem" }}>
								<Card.Header>{item.title}</Card.Header>
								<Card.Img variant="top" src={item.img} />
								<Card.Body>
									<Card.Title>{item.category}</Card.Title>
									<Card.Text>{item.description}</Card.Text>
									<Card.Text>Buy Now</Card.Text>
								</Card.Body>
							</Card>
						</Col>
					))}
				</Row>
			</Container>
		);
	}
}

export default ProductsGrid;

// </div>
//         </div>
// 			<tbody>
// 				{data.map((item) => (
// 					<tr key={item._id}>
// 						{columns.map((column) => (
// 							<td key={this.createKey(item, column)}>
// 								{this.renderCell(item, column)}
// 							</td>
// 						))}
// 					</tr>
// 				))}
// 			</tbody>
// <Row xs={1} md={2} className="g-4">

// 	{Array.from({ length: 4 }).map((_, idx) => (
// 		<Col>
// 			<Card>
// 				<Card.Img variant="top" src="holder.js/100px160" />
// 				<Card.Body>
// 					<Card.Title>Card title</Card.Title>
// 					<Card.Text>
// 						This is a longer card with supporting text below as a natural lead-in
// 						to additional content. This content is a little bit longer.
// 					</Card.Text>
// 				</Card.Body>
// 			</Card>
// 		</Col>
// 	))}
// </Row>
