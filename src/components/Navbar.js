import { Component } from "react";
import { NavLink } from "react-router-dom";

class Navbar extends Component {
  render = () => {
    return (
      <nav style={navStyle}>
        <NavLink to="/">
          <h1>ProjectsFUP</h1>
        </NavLink>
        <div>links logados</div>
        <div>
          <NavLink to="/signup">Signup</NavLink>
          <NavLink to="/login">Login</NavLink>
        </div>
      </nav>
    );
  };
}

const navStyle = {
  display: "flex",
  justifyContent: "space-between",
};

export default Navbar;
