import React from "react";
import Joi from "joi-browser"; // a pretty sweet library for doing validation stuff in forms
import Form from "../common/form";
import { toast } from "react-toastify";
import {
  getAllProducts,
  getProduct,
  saveProduct,
} from "../../services/productService";
import { Col, Row } from "react-bootstrap";
import { Card1, CardBody1, CardHeader1 } from "../common/cards";
import { Button } from "../common/buttons";
import { FileInput } from "../common/inputs";

class ProductForm extends Form {
  state = {
    data: {
      title: "",
      price: "",
      category: "",
      description: "",
      img: "",
    },
    imageFile: null,
    errors: {},
  };

  schema = {
    _id: Joi.string(),
    title: Joi.string().required().label("Title"),
    price: Joi.number().required().label("Price"),
    category: Joi.string().min(0).max(100).required().label("Category"),
    description: Joi.string().min(0).max(50).required().label("Description"),
  };

  async populateProducts() {
    try {
      const productId = this.props.match.params.id;
      if (productId === "new") return;

      const { data: product } = await getProduct(productId);
      this.setState({
        data: this.mapToViewModel(product),
      });
    } catch (error) {
      if (error.response && error.response.status === 404)
        this.props.history.replace("/not-found");
      toast.error("What can I say get the backend ready");
    }
  }

  async componentDidMount() {
    await this.populateProducts();
  }

  mapToViewModel(product) {
    return {
      _id: product._id,
      title: product.title,
      category: product.category,
      price: product.price,
      description: product.description,
      img: product.img,
    };
  }

  doSubmit = async (e) => {
    e.preventDefault();
    console.log("do submit");
    await saveProduct(this.state.data);
    // Call the server
    this.props.history.push("/dash");
    toast("Updated");
  };

  // handleImage = (e) => {
  //   e.preventDefault();

  //   const errors = this.validate();
  //   this.setState({ errors: errors || {} });
  //   if (errors) return;

  //   this.doSubmit();
  // };

  handleUpload = async (e) => {
    e.preventDefault();
    await this.doUpload();
    const data = getAllProducts();
    this.setState({ imageFile: null });
    console.log(data);
    this.setState({ data });
    await this.populateProducts();
  };

  doUpload = async () => {
    try {
      const { title, price, category, description } = this.state.data;
      let newData = new FormData();
      newData.append("image", this.state.imageFile);
      newData.append("title", title);
      newData.append("category", price);
      newData.append("price", category);
      newData.append("description", description);
      // await saveProduct(newData);
      console.log(newData);
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        // errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  handleFileStats = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    console.log(file);
    this.setState({
      imageFile: file,
      loaded: 0,
    });
    console.log(this.state);
  };

  render() {
    const { data, imageFile } = this.state;
    const doc = {};
    if (imageFile && imageFile.name) {
      doc.text = imageFile.name;
    } else doc.text = "Change Image";
    if (data.img === "") {
      doc.text = "Choose Image";
    }
    doc.style1 = imageFile ? "me-3" : "d-none";
    doc.style2 = data.img !== "" ? "my-3 mx-auto" : "my-3 mx-auto d-none";
    return (
      <div className="m-auto container">
        {/* <Row className="m-auto"> */}
        {/* <Col sm={5}>
            <Card1 className="m-0 bg-primary bg-opacity-10">
              <div className="my-3 mx-auto">
                <img
                  className="rounded-circle mt-3 border border-4 border-primary"
                  src={data.primageurl}
                  alt="profile"
                  width="140"
                />
              </div>
              <CardBody1 className="mx-auto text-center">
                <h3>{data.name}</h3>
                {FileInput(doc.text, this.handleFileStats)}
                <Button onClick={this.handleUpload} className={doc.style1}>
                  Upload
                </Button>
              </CardBody1>
            </Card1>
          </Col> */}
        {/* <Col sm={7}> */}
        <Card1 className="m-0">
          <CardHeader1 as="h4" className="mx-3 px-0">
            Edit Product
          </CardHeader1>
          <CardBody1>
            <form>
              {this.renderInput("title", "Title")}
              {this.renderInput("category", "Category")}
              {this.renderInput("price", "Price")}
              {this.renderInput("description", "Description")}
              <div className={doc.style2}>
                <img
                  className="mt-3 border border-2 border-primary"
                  src={data.img}
                  alt="product image"
                  width="300"
                />
              </div>
              {FileInput(doc.text, this.handleFileStats)}
              <Button onClick={this.handleUpload} className={doc.style1}>
                Upload
              </Button>
              <Button onClick={this.doSubmit} className="mt-2">
                Save
              </Button>
              {/* {this.renderButton("Save", this.handleSubmit)} */}
              {/* <div className="my-3 mx-auto">
                <img
                  className="mt-3 border border-2 border-primary"
                  src={this.state.data.img}
                  alt="product image"
                  width="200"
                />
              </div> */}
            </form>
          </CardBody1>
        </Card1>
        {/* </Col> */}
        {/* </Row> */}
      </div>
    );
  }
}

export default ProductForm;

// import React, { Component } from "react";
// import { toast } from "react-toastify";
// import { getProduct } from "../../services/productService";

// class ProductDetails extends Component {
// 	state = {
// 		data: {
// 			title: "",
// 			price: "",
// 			category: "",
// 			description: "",
// 			img: "",
// 		},
// 	};

// 	async populateProducts() {
// 		try {
// 			const productId = this.props.match.params.id;
// 			if (productId === "new") return;

// 			const { data: product } = await getProduct(productId);
// 			this.setState({
// 				data: this.mapToViewModel(product),
// 			});
// 		} catch (error) {
// 			if (error.response && error.response.status === 404)
// 				this.props.history.replace("/not-found");
// 			toast.error("What can I say get the backend ready");
// 		}
// 	}

// 	async componentDidMount() {
// 		await this.populateProducts();
// 	}

// 	mapToViewModel(product) {
// 		return {
// 			_id: product._id,
// 			title: product.title,
// 			category: product.category,
// 			price: product.price,
// 			description: product.description,
// 			img: product.img,
// 		};
// 	}

// 	handleShop = () => {
// 		// navigate to products
// 	};

// 	// componentDidMount() {
// 	// 	this.generateProductName(this.props.match.params.id);
// 	// }

// 	// generateProductName = (match) => {
// 	// 	const result = this.products.find((e) => JSON.stringify(e.id) === match);
// 	// 	if (result && result.name) {
// 	// 		const productName = result.name;
// 	// 		this.setState({ productName });
// 	// 	}
// 	// };

// 	renderField(name) {
// 		const { data } = this.state;
// 		// const name = name
// 		return data[name];
// 	}

// 	// addOne = (val) => {
// 	// 	if (val && val >= 0) val = val++;
// 	// 	console.log(val);
// 	// };

// 	// subOne = (val) => {
// 	// 	if (val && val >= 0) val = val--;
// 	// 	console.log(val);
// 	// };

// 	render() {
// 		return (
// 			<div>
// 				<h1>{this.renderField("title")}</h1>
// 				<h4>Category: {this.renderField("category")}</h4>
// 				<h4>Price: {this.renderField("price")}</h4>
// 				<h4>Description: {this.renderField("description")}</h4>
// 				<img src={this.renderField("img")} />
// 				<button onClick={this.handleShop} className="btn btn-primary mt-2">
// 					Shop Now
// 				</button>
// 			</div>
// 			// 		<i
// 			// 			onClick={() => this.addOne(val)}
// 			// 			style={{ cursor: "pointer" }}
// 			// 			className="ri-add-circle-fill ri-2x"
// 			// 		></i>
// 			// 		{val}
// 			// 		<i
// 			// 			onClick={() => this.subOne(val)}
// 			// 			style={{ cursor: "pointer" }}
// 			// 			className="ri-indeterminate-circle-fill ri-2x"
// 			// 		></i>
// 		);
// 	}
// }

// export default ProductDetails;
