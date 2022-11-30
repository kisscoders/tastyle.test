import React from "react";
import Joi from "joi-browser"; // a pretty sweet library for doing validation stuff in forms
import Form from "../components/common/form";
import authService from "../services/authService";
import { Row, Col, Card, Image } from "react-bootstrap";
import styled from "styled-components";
import { GrHomeProtein } from "../assets";

import { Link } from "react-router-dom";

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

const SIGNUPBOX1 = styled(Card)`
  border-radius: 1rem;
  box-shadow: 0 2px 0 rgba(138, 182, 231, 0.11),
    0 4px 8px rgba(90, 97, 105, 0.12), 0 10px 10px rgba(90, 97, 105, 0.06),
    0 7px 70px rgba(90, 97, 105, 0.1);
  width: 800px;
  height: 500px;
`;

const COL = styled(Col)`
  background-color: #ef9a9a;
  height: 500px;
  border-radius: 0 1rem 1rem 0;

  /* border-top-right-radius: 0.625rem; */
  /* border-bottom-right-radius: 0.625rem; */
  /* width: 800px; */
  /* padding-top: 30px; */
  /* padding-left: 20px; */
  /* padding-right: 20px; */
`;

const CARD = styled(Card)`
  border: none;
  border-radius: 0.825rem;
  /* margin-top: 50px; */
  width: 300px;
  height: 400px;
  /* margin-left: 50px; */
  /* margin-right: 15px; */
  box-shadow: 0 2px 0 rgba(138, 182, 231, 0.11),
    0 4px 8px rgba(90, 97, 105, 0.12), 0 10px 10px rgba(90, 97, 105, 0.06),
    0 7px 70px rgba(90, 97, 105, 0.1);
`;
const Div = styled.div`
  /* border: none; */
  /* border-radius: 0.3rem; */
  /* margin-left: -0.5px; */
  /* margin-right: 1px; */
  /* width: 300px; */
  /* height: 400px; */
  background-color: #fff3e0;
`;
const H6 = styled.h6`
  line-height: 1;
  margin-left: 12px;
  padding-top: 50px;
  text-align: center;
`;
const IMAGE = styled(Image)`
  width: 200px;
  height: 150px;
  margin-top: 20px;
  margin-left: 50px;
  border: 3px solid gray;
  border-radius: 0.625rem;
  box-shadow: 4px 8px #fff59d;
  &:hover {
    color: #fff;
    background-color: #f54749;
    border-color: #fec65e;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05),
      0 4px 10px rgba(0, 123, 255, 0.25);
  }
`;

class SignupForm extends Form {
  state = {
    data: {
      username: "",
      password: "",
      name: "",
    },
    errors: {},
  };

  schema = {
    username: Joi.string().email().required().label("Username"),
    password: Joi.string().min(5).required().label("Password"),
    name: Joi.string().required().label("Name"),
  };

  doSubmit = async () => {
    try {
      const response = await authService.register(this.state.data);
      authService.loginWithJwt(response.headers["x-auth-token"]);
      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <div>
        <SIGNUPBOX1 className="mx-auto">
          <Row className="p-0 m-0">
            <Col sm={6} className="m-0">
              <h3 className="text-center mt-4">Registration info &#128077;</h3>
              <form onSubmit={this.handleSubmit} className="mt-4 mx-3 my-3">
                {this.renderInput("username", "Username")}
                {this.renderInput("password", "Password", "password")}
                {this.renderInput("name", "Name")}
                {this.renderButton("Register")}
              </form>
              <NavLink to="/login">Login</NavLink>
            </Col>
            <COL>
              <CARD className="m-auto mt-5">
                <H6>
                  "<span style={{ color: "#00695c" }}>Quality </span>and{" "}
                  <span style={{ color: "#33691e" }}>healthy 🥙 </span>
                  solution to{" "}
                  <span style={{ color: "#ef5350" }}>Fast food market</span>
                  ."
                </H6>
                <H6>
                  "To be the most{" "}
                  <span style={{ color: "#01579b" }}>trusted </span> and{" "}
                  <span style={{ color: "#b71c1c" }}>loved 🌽 </span>{" "}
                  <span style={{ color: "#f57f17" }}>
                    healthy-consumable manufacturing company
                  </span>{" "}
                  in Sri Lanka, and of course the most
                  <span style={{ color: "#9c27b0" }}> profitable</span> one.
                </H6>
                {/* <IMAGE src={GrHomeProtein} /> */}
              </CARD>
            </COL>
          </Row>
        </SIGNUPBOX1>
      </div>
    );
  }
}

export default SignupForm;
