import logo from '../img/spXlogo.png'
import styled from 'styled-components'
import React, { useEffect, useState } from 'react';
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

  const backgroundNav = () =>{
    if(scrollTop === 0){
      return "rgba(0, 0, 99, 0)"
    }
    else{
      return "rgba(0, 0, 0, 0.75) "
    }
  }
  return (
    <nav style={{background: backgroundNav()}}>
      <div className="logo">
        <img src={logo} alt="logo" style={{maxWidth: "100%"}}/>
      </div>
      <ul className="menu">
          <Li>Rockets</Li>
          <Li>Launches</Li>
      </ul>
    </nav>
  );
}
const Li = styled.li`
  color: #FFF;
`

export default Navbar;
