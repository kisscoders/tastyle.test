import React from "react";
import Joi from "joi-browser"; // a pretty sweet library for doing validation stuff in forms
import Form from "../components/common/form";
import authService from "../services/authService";
import { Card, Container, Image } from "react-bootstrap";
import styled from "styled-components";
import { GrHomeLanding, GrTastyle } from "../assets";

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
const Image1 = styled(Image)`
  margin-top: 2px;
  image-color: var(--red);
  width: 30%;
  align-items: center;
  justify-content: center;
  opacity: 0.5;
`;
const Image2 = styled(Image)`
  margin-top: 10px;
  margin-left: 950px;
  image-color: var(--red);
  width: 20%;
  align-items: center;
  justify-content: center;
  opacity: 0.3;
`;

const SIGNUPBOX1 = styled(Card)`
  border-radius: 1rem;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  width: 350px;
  height: 450px;
  background: #ffff;
`;

const Div = styled.div`
  position: absolute;
  top: 35%;
  left: 40%;
  margin: -25px 0 0 -25px;
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
        <Container fluid className="Login_design">
          <Image1 src={GrHomeLanding} />
          <Div>
            <SIGNUPBOX1 className="mx-auto">
              <div className="bg-danger">
                <h3 className="text-center mt-4">
                  Registration info &#128077;
                </h3>
              </div>
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
            </SIGNUPBOX1>
          </Div>
          <Image2 src={GrHomeLanding} />
        </Container>
      </div>
    );
  }
}

export default SignupForm;
