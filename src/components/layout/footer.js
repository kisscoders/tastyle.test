import React from "react";
import { Container } from "react-bootstrap";
import styled from "styled-components";
import { FaFacebook, FaInstagram, FaYoutube, FaTwitter } from "react-icons/fa";
import { GoMarkGithub } from "react-icons/go";

const FooterContainer = styled(Container)`
  background-size: 400% 400%;
  display: grid;
  font-family: "Poppins", sans-serif;
  place-items: center;
  background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
  padding-top: 40px;
`;

const FooterText = styled.p`
  /* padding: 10px 0 0 13px; */
  /* margin: 2px; */
  font-weight: 600;
  font-size: 18px;
  color: white;
`;

export default function Footer() {
  return (
    <FooterContainer fluid>
      <div className="footer_wrapper">
        <div className="icon facebook">
          <div className="tooltip">Facebook</div>
          <span>
            <FaFacebook />
          </span>
        </div>
        <div className="icon twitter">
          <div className="tooltip">Twitter</div>
          <span>
            <FaTwitter />
          </span>
        </div>
        <div className="icon instagram">
          <div className="tooltip">Instagram</div>
          <span>
            <FaInstagram />
          </span>
        </div>
        <div className="icon github">
          <div className="tooltip">Github</div>
          <span>
            <GoMarkGithub />
          </span>
        </div>
        <div className="icon youtube">
          <div className="tooltip">Youtube</div>
          <span>
            <FaYoutube />
          </span>
        </div>
      </div>

      <div className="py-2 text-center">
        <FooterText>© 2021 tastyle All rights reserved.</FooterText>
      </div>
    </FooterContainer>
  );
}
