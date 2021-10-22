import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { getCurrentUser } from "../../services/authService";
import { BRAND } from "../common/text/headings";
import styled from "styled-components";
const user = getCurrentUser();

const FooterContainer = styled(Container)``;
const SMIcon = styled;
export default function Footer() {
  return (
    <FooterContainer>
      <div className="container py-5">
        <div className="row py-4">
          <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
            <img src="img/logo.png" alt="" width="180" className="mb-3" />
            <p className="font-italic text-muted">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt.
            </p>
            <ul className="list-inline mt-4">
              <li className="list-inline-item">
                <a href="#" target="_blank" title="twitter">
                  <i className="ri-twitter-fill"></i>
                </a>
              </li>
              <li className="list-inline-item">
                <a href="#" target="_blank" title="facebook">
                  <i className="ri-facebook-circle-fill"></i>
                </a>
              </li>
              <li className="list-inline-item">
                <a href="#" target="_blank" title="instagram">
                  <i className="ri-instagram-fill"></i>
                </a>
              </li>
              <li className="list-inline-item">
                <a href="#" target="_blank" title="pinterest">
                  <i className="ri-pinterest-fill"></i>
                </a>
              </li>
              <li className="list-inline-item">
                <a href="#" target="_blank" title="youtube">
                  <i className="ri-youtube-fill"></i>
                </a>
              </li>
            </ul>
          </div>
          <div className="col-lg-2 col-md-6 mb-4 mb-lg-0">
            <h6 className="text-uppercase font-weight-bold mb-4">Shop</h6>
            <ul className="list-unstyled mb-0">
              <li className="mb-2">
                <a href="#" className="text-muted">
                  For Women
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-muted">
                  For Men
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-muted">
                  Stores
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-muted">
                  Our Blog
                </a>
              </li>
            </ul>
          </div>
          <div className="col-lg-2 col-md-6 mb-4 mb-lg-0">
            <h6 className="text-uppercase font-weight-bold mb-4">Company</h6>
            <ul className="list-unstyled mb-0">
              <li className="mb-2">
                <a href="#" className="text-muted">
                  Login
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-muted">
                  Register
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-muted">
                  Wishlist
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-muted">
                  Our Products
                </a>
              </li>
            </ul>
          </div>
          <div className="col-lg-4 col-md-6 mb-lg-0">
            <h6 className="text-uppercase font-weight-bold mb-4">Newsletter</h6>
            <p className="text-muted mb-4">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. At
              itaque temporibus.
            </p>
            <div className="p-1 rounded border">
              <div className="input-group">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  aria-describedby="button-addon1"
                  className="form-control border-0 shadow-0"
                />
                <div className="input-group-append">
                  <button
                    id="button-addon1"
                    type="submit"
                    className="btn btn-link"
                  >
                    <i className="fa fa-paper-plane"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-2 text-center">
        <p className="text-muted mb-0">© 2021 tastyle All rights reserved.</p>
      </div>
    </FooterContainer>
  );
}
