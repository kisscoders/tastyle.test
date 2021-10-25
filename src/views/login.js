// import React from "react";
// import Joi from "joi-browser"; // a pretty sweet library for doing validation stuff in forms
import Form from "../components/common/form";
import auth from "../services/authService";
// import { Redirect } from "react-router-dom";
// import { Card1, CardBody1, CardHeader1 } from "../components/common/cards";

// class LoginPage extends Form {
// 	state = {
// 		data: { username: "", password: "" },
// 		errors: {},
// 	};

// 	schema = {
// 		username: Joi.string().required().label("Username"),
// 		password: Joi.string().required().label("Password"),
// 	};

// 	doSubmit = async () => {
// 		try {
// 			const { data } = this.state;
// 			await authService.login(data.username, data.password);

// 			const { state } = this.props.location;
// 			window.location = state ? state.from.pathname : "/";
// 		} catch (ex) {
// 			if (ex.response && ex.response.status === 400) {
// 				const errors = { ...this.state.errors };
// 				errors.username = ex.response.data;
// 				this.setState({ errors });
// 			}
// 		}
// 	};

// 	render() {
// 		if (authService.getCurrentUser()) return <Redirect to="/" />;
// 		return (
// 			<div className="justify-content-md-center row">
// 				<Card1 className="col col-lg-6">
// 					<CardHeader1 as="h2">Login</CardHeader1>
// 					<CardBody1>
// 						<form onSubmit={this.handleSubmit}>
// 							{this.renderInput("username", "Username")}
// 							{this.renderInput("password", "Password", "password")}
// 							{this.renderButton("Login")}
// 						</form>
// 					</CardBody1>
// 				</Card1>
// 			</div>
// 		);
// 	}
// }

// export default LoginPage;

import React from "react";
import Joi from "joi-browser"; // a pretty sweet library for doing validation stuff in forms
// import auth from "../../services/authService";
import { Redirect } from "react-router-dom";
import { Row, Col, Card, Image } from "react-bootstrap";
import { GrBrandV3 } from "../assets";
import { Link } from "react-router-dom";
import styled from "styled-components";

// import "./login.css";

const LOGINBOX1 = styled(Card)`
  border-radius: 1rem;
  box-shadow: 0 2px 0 rgba(138, 182, 231, 0.11),
    0 4px 8px rgba(90, 97, 105, 0.12), 0 10px 10px rgba(90, 97, 105, 0.06),
    0 7px 70px rgba(90, 97, 105, 0.1);
  width: 800px;
  height: 500px;
`;

const NavLink = styled(Link)`
  text-decoration: none;
  margin: 5px;
  padding: 6px 10px;
  color: var(--red);
  font-weight: 500;
  transition: all 250ms cubic-bezier(0.27, 0.01, 0.38, 1.06);
  border-radius: 20px;
  &:hover {
    border-radius: 20px;
    background-color: var(--red);
    color: white;
  }
`;

class LoginPage extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {},
  };

  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  doSubmit = async () => {
    try {
      const { data } = this.state;
      await auth.login(data.username, data.password);

      const { state } = this.props.location;
      window.location = state ? state.from.pathname : "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    if (auth.getCurrentUser()) return <Redirect to="/" />;
    return (
      <div>
        <LOGINBOX1 className="mx-auto">
          <Row>
            <Col className="C_design">
              <Card className="login_shadowbox1">
                <Image className="I_design" src={GrBrandV3} />
                <div className="D_design">
                  <h4 className="h4_align">
                    <h4>Very good works are Waitting for you</h4>
                    <h4>
                      Login Now <span> &#128512;</span>{" "}
                    </h4>
                  </h4>
                </div>
              </Card>
              {/* </Col>
            <Col>
              <form onSubmit={this.handleSubmit} className="mt-4 mx-3 my-3">
                <h2>Login &#128073;</h2>
                <br></br>
                {this.renderInput("username", "Username")}

                {this.renderInput("password", "Password", "password")}
                <h6 className="text-center">
                  <a href="/">for get password?</a>
                </h6>
                <br></br>
                <div className="text-center">
                  {this.renderButton("Sign in")}
                </div>
                <br></br>
                <p className="text-center">
                  Create a new account?
                  <NavLink to="/signup">Sign Up</NavLink>
                </p>
              </form>
            </Col>
          </Row> */}
            </Col>
            <Col>
              <Col>
                <form onSubmit={this.handleSubmit} className="mt-4 mx-3 my-3">
                  <fieldset>
                    <h2>Login &#128073;</h2>
                    <br></br>

                    {this.renderInput("username", "Username")}

                    {this.renderInput("password", "Password", "password")}
                    <div className="text-center">
                      {this.renderButton("Sign in")}
                    </div>
                    <br></br>

                    <p className="text-center">
                      Create a new account? Create a new account?
                      <NavLink to="/signup">Sign Up</NavLink>
                    </p>
                  </fieldset>
                </form>
              </Col>
            </Col>
          </Row>
        </LOGINBOX1>
      </div>
    );
  }
}

export default LoginPage;
