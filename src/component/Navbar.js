import logo from '../img/spXlogo.png'
import styled from 'styled-components'
import React, { useEffect, useState } from 'react';
import {
  Link
} from 'react-router-dom';
const Navbar = () => {
  const [scrollTop, SetscrollTop] = useState(window.scrollY)
  useEffect(() => {
    function handleScroll() {
      SetscrollTop(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const backgroundNav = () => {
    if (scrollTop === 0) {
      return "rgba(0, 0, 99, 0)"
    }
    else {
      return "rgba(0, 0, 0, 0.75) "
    }
  }
  return (
    <nav style={{ background: backgroundNav() }}>
    <div className="nav-flex">
      <div className="logo">
          <Link to="/">
            <img src={logo} alt="logo" style={{ maxWidth: "100%" }} />
          </Link>    
      </div>
      <ul className="menu">
        <Li>
          <Link to="/rockets" style={{textDecoration: "none", color:"white"}}>
            Rockets
          </Link>
        </Li>
        <Li>
          <Link to="/launches" style={{textDecoration: "none", color:"white"}}>
            Launches
          </Link>
        </Li>
      </ul>
    </div>
  </nav>
  );
}
const Li = styled.li`
  color: #FFF;
`

export default Navbar;
