import React from "react";
import styled from "styled-components";
import Joi from "joi-browser";
import Form from "../components/common/form";
import authService from "../services/authService";
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

const Div = styled.div`
  background: #ed4264;
  background: -webkit-linear-gradient(to right, #ffedbc, #ed4264);
  background: linear-gradient(to right, #ffedbc, #ed4264);
  min-width: 100%;
  min-width: 100vw;
  min-height: 100%; /* Fallback for browsers do NOT support vh unit */
  min-height: 100vh; /* These two lines are counted as one :-)       */
  display: flow-root;
  position: fixed;
  top: 0;
  right: 0;
  z-index: 1;
`;

const RegisterBox1 = styled.div`
  border-radius: 1rem;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  min-width: 30%;
  min-width: 30vw;
  background: #ffff;
  text-align: center;
  padding: 30px;
  margin: auto;
`;

export const H3 = styled.h3`
  font-weight: 700;
  font-size: 36px;
  margin: auto auto 30px auto;
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
      <Div className="d-flex align-items-center">
        <RegisterBox1>
          <H3>
            Hi there! 👋🏽 <br /> Are you excited? 🥳
          </H3>
          <form onSubmit={this.handleSubmit}>
            {this.renderInput("name", "Name")}
            {this.renderInput("username", "E-mail")}
            {this.renderInput("password", "Password", "password")}
            <div className="my-3">{this.renderButton("Register")}</div>
            <p className="">Already joined the family?</p>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/home">Home</NavLink>
          </form>
        </RegisterBox1>
      </Div>
    );
  }
}

export default SignupForm;
