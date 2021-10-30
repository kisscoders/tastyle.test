import React from "react";
import styled from "styled-components";
import authService from "../services/authService";
import Joi from "joi-browser";
import Form from "../components/common/form";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";

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

const LoginBox1 = styled.div`
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

class LoginPage extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {},
  };

  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  handleShow(breakpoint) {
    setFullscreen(breakpoint);
    setShow(true);
  }

  doSubmit = async () => {
    try {
      const { data } = this.state;
      await authService.login(data.username, data.password);

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
    if (authService.getCurrentUser()) return <Redirect to="/" />;
    return (
      <Div className="d-flex align-items-center">
        <LoginBox1 className="">
          <form onSubmit={this.handleSubmit} className="m-auto">
            <H3>
              Hello dear! 😊 <br />
              Welcome Back 🥂
            </H3>

            {this.renderInput("username", "Username")}
            {this.renderInput("password", "Password", "password")}

            <div className="my-3">{this.renderButton("Sign in")}</div>

            <p className="">New to the family?</p>
            <NavLink to="/signup">Sign Up</NavLink>
            <NavLink to="/home">Home</NavLink>
          </form>
        </LoginBox1>
      </Div>
    );
  }
}

export default LoginPage;
