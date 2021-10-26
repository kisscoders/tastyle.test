import React from "react";
import Joi from "joi-browser"; // a pretty sweet library for doing validation stuff in forms
import Form from "../components/common/form";
import authService from "../services/authService";
import { Row, Col, Card, Image } from "react-bootstrap";
import styled from "styled-components";
import { GrHomeLanding } from "../assets";

import { Link } from "react-router-dom";
import { GREEN, RED, YELLOW, blue } from "../theme/colors";

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
  background-color: #ff8a65;
  height: 500px;
  border-radius: 0 1rem 1rem 0;
`;

const CARD = styled(Card)`
  border: none;
  border-radius: 0.825rem;
  width: 300px;
  height: 400px;
  box-shadow: 0 2px 0 rgba(138, 182, 231, 0.11),
    0 4px 8px rgba(90, 97, 105, 0.12), 0 10px 10px rgba(90, 97, 105, 0.06),
    0 7px 70px rgba(90, 97, 105, 0.1);
`;

const Div = styled.div`
  background-color: #fff3e0;
`;

const H5 = styled.h5`
  line-height: 1;
  margin-left: 12px;
  padding-top: 50px;
  text-align: center;
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
  margin-top: 30px;
  margin-left: 120px;
  border: 3px solid #fec65e;
  border-radius: 0.625rem;
  box-shadow: 4px 8px #fff59d;
  background-color: #f54749;
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
                <div className="text-center">
                  {this.renderButton("Register")}
                </div>
              </form>
              <p className="text-center">
                {" "}
                Already create?
                <NavLink to="/login">Login</NavLink>
              </p>
            </Col>
            <COL>
              <CARD className="m-auto mt-5">
                <H5>
                  "<GREEN>Quality</GREEN> and <GREEN>healthy </GREEN>🥙 solution
                  to <RED>Fast food market </RED>."
                </H5>
                <H6>
                  "To be the most trusted and loved healthy-consumable
                  manufacturing company 🌽 in Sri Lanka, and of course the most
                  profitable one.
                </H6>
                <IMAGE src={GrHomeLanding} />
              </CARD>
            </COL>
          </Row>
        </SIGNUPBOX1>
      </div>
    );
  }
}

export default SignupForm;
