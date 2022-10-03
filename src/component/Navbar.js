import logo from "../img/spXlogo.png";
import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  const [scrollTop, SetscrollTop] = useState(window.scrollY);
  useEffect(() => {
    function handleScroll() {
      SetscrollTop(window.scrollY);
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const backgroundNav = () => {
    if (scrollTop === 0) {
      return "rgba(0, 0, 99, 0)";
    } else {
      return "rgba(0, 0, 0, 0.55) ";
    }
  };
  return (
    <nav style={{ background: backgroundNav() }}>
      <div className="nav-flex">
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="logo" width="210" height="34" />
          </Link>
        </div>
        <ul className="menu">
          <Li>
            {window.innerWidth <= 320 ? null : (
              <NavLink exact to="/" activeStyle={{ borderBottom: "2px solid #fff", paddingBottom: "9px" }} style={{ textDecoration: "none", color: "white" }}>
                Home
              </NavLink>
            )}
          </Li>
          <Li>
            <NavLink to="/rockets" activeStyle={{ borderBottom: "2px solid #fff", paddingBottom: "9px" }} style={{ textDecoration: "none", color: "white" }}>
              Rockets
            </NavLink>
          </Li>
          <Li>
            <NavLink to="/launches" activeStyle={{ borderBottom: "2px solid #fff", paddingBottom: "9px" }} style={{ textDecoration: "none", color: "white" }}>
              Launches
            </NavLink>
          </Li>
        </ul>
      </div>
    </nav>
  );
};
const Li = styled.li`
  color: #fff;
  transition: 0.25s;
  border-bottom: 2px solid transparent;
  :hover {
    border-bottom: 2px solid #fff;
  }
`;

export default Navbar;
