import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Container, Nav, NavDropdown, Image } from "react-bootstrap";
import { getCurrentUser } from "../../services/authService";
import { BRAND } from "../common/text/headings";
import styled from "styled-components";
const user = getCurrentUser();

const MainNavBar = styled.div`
  /* background-color: antiquewhite; */
  padding: 15px 10px 40px 10px;
  margin: 20px auto;
  /* border-radius: 50px; */
  width: 60%;
  align-items: center;
  justify-content: center;
`;

const ProfileMark = styled.div`
  text-align: center;
  padding: 0px 10px 10px 10px;
  margin: auto;
  background-color: var(--red);
  border-radius: 0 0 50px 50px;
  position: absolute;
  top: 0;
  right: 50px;
  &:hover {
    transform: scale(1.01);
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  }
`;

const ProfileLink = styled(Link)`
  text-decoration: none;
  margin: auto;
  transition: all 250ms cubic-bezier(0.27, 0.01, 0.38, 1.06);
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
const IconLink = styled(Link)`
  text-decoration: none;
  align-items: center;
  justify-content: center;
  color: white;
  display: flex;
  padding: 10px 2px;
  margin: auto;
  font-size: 20px;
  font-weight: 500;
  transition: all 250ms cubic-bezier(0.27, 0.01, 0.38, 1.06);
  border-radius: 20px;
  &:hover {
    border-radius: 20px;
    background-color: none;
    color: black;
  }
`;

export default function NavBar() {
  return (
    <div>
      <BRAND as={Link} to="/">
        tastyle
      </BRAND>
      <MainNavBar className="d-flex mb-3 align-items-center">
        <div className="">
          <NavLink to="/list">Our Products</NavLink>
          <NavLink to="/about">Why us?</NavLink>
        </div>
        {/* <div>
          {!user && (
            <div>
              <NavLink to="/login">Login</NavLink>
              <NavLink to="/signup">Signup</NavLink>
            </div>
          )}
          {user && (
            <div className="d-flex align-items-center">
              <NavLink className="icon" to="/dash">
                <i className="ri-dashboard-fill"></i>
              </NavLink>
              <NavLink className="icon" to="/logout">
                <i className="ri-logout-box-r-line"></i>
              </NavLink>
              <NavLink className="me-2" to="/dash">
                <Image roundedCircle src={user.avatar.url} width="40" />
              </NavLink>
            </div>
          )}
        </div> */}
      </MainNavBar>
      <ProfileMark>
        {!user && (
          <IconLink to="/login" className="px-3">
            <i className="ri-login-box-line"></i>
          </IconLink>
        )}
        {user && (
          <div>
            <IconLink to="/logout">
              <i className="ri-logout-box-r-line"></i>
            </IconLink>
            <ProfileLink to="/dash">
              <Image roundedCircle src={user.avatar.url} width="60" />
            </ProfileLink>
          </div>
        )}
      </ProfileMark>
    </div>
  );
}
