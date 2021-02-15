import logo from '../img/logo.png'

const Navbar = () => {
  return (
    <nav>
      <div className="logo">
        <img src={logo} alt="logo"/>
      </div>
      <ul className="menu">
          <li>Rockets</li>
          <li>Launches</li>
      </ul>
    </nav>
  );
}

export default Navbar;
