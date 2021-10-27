import Form from "../components/common/form";
import auth from "../services/authService";

import React from "react";
import Joi from "joi-browser"; // a pretty sweet library for doing validation stuff in forms
// import auth from "../../services/authService";
import { Redirect } from "react-router-dom";
import { Row, Col, Card, Image, Container } from "react-bootstrap";
import { GrBrandV3 } from "../assets";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { GREEN, RED, YELLOW } from "../theme/colors";

// import "./login.css";
const Div = styled.div`
  position: absolute;
  top: 35%;
  left: 40%;
  margin: -25px 0 0 -25px;
`;

const LOGINBOX1 = styled(Card)`
  border-radius: 1rem;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  width: 350px;
  height: 450px;
  background: #ffff;
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
        <Container fluid className="Login_design">
          {/* <Container> */}
          <Div>
            <LOGINBOX1 className=" mx-auto">
              <form onSubmit={this.handleSubmit} className="mt-4 mx-3 my-3">
                <fieldset>
                  <h2 className="text-center">Login &#128073;</h2>

                  <br></br>

                  {this.renderInput("username", "Username")}

                  {this.renderInput("password", "Password", "password")}
                  <div className="text-center">
                    {this.renderButton("Sign in")}
                  </div>
                  <br></br>

                  <p className="text-center">
                    Create a new account?
                    <NavLink to="/signup">Sign Up</NavLink>
                  </p>
                </fieldset>
              </form>
              {/* </Col>
            </Col>
          </Row> */}
            </LOGINBOX1>
          </Div>
        </Container>
      </div>
    );
  }
}

export default LoginPage;
