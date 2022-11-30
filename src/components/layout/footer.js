import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { getCurrentUser } from "../../services/authService";
import { BRAND } from "../common/text/headings";
import "./Footer.css";
import styled from "styled-components";
import { Button } from "../common/buttons";
import {
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaTwitter,
  FaLinkedin,
} from "react-icons/fa";
import { GoMarkGithub } from "react-icons/go";
import { MdFingerprint } from "react-icons/md";

const user = getCurrentUser();

const FooterContainer = styled(Container)`
  display: grid;
  height: 100%;
  width: 100%;
  font-family: "Poppins", sans-serif;
  place-items: center;
  background: linear-gradient(315deg, #e57373, #d7e1ec);
  margin-top: 50px;
  padding-top: 50px;
`;
const SMIcon = styled;
export default function Footer() {
  return (
    <FooterContainer fluid className="py-5 ">
      <div className="wrapper">
        <div className="icon facebook">
          <div className="tooltip">Facebook</div>
          <span>
            {/* <i className="fab fa-facebook-f"></i> */}
            <FaFacebook />
          </span>
        </div>
        <div className="icon twitter">
          <div className="tooltip">Twitter</div>
          <span>
            {/* <i className="fab fa-twitter"></i> */}
            <FaTwitter />
          </span>
        </div>
        <div className="icon instagram">
          <div className="tooltip">Instagram</div>
          <span>
            {/* <i className="fab fa-instagram"></i> */}
            <FaInstagram />
          </span>
        </div>
        <div className="icon github">
          <div className="tooltip">Github</div>
          <span>
            {/* <i className="fab fa-github"></i> */}
            <GoMarkGithub />
          </span>
        </div>
        <div className="icon youtube">
          <div className="tooltip">Youtube</div>
          <span>
            {/* <i className="fab fa-youtube"></i> */}

            <FaYoutube />
          </span>
        </div>
      </div>

      <div className="py-2 text-center">
        <p className="text-success mb-0">© 2021 tastyle All rights reserved.</p>
      </div>
    </FooterContainer>
  );
}
