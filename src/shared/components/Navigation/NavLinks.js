import React, { useContext } from "react";

import "./NavLinks.css";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import { AuthContext } from "../../context/auth-context";
import Button from "../FormElements/Button";

const NavLinks = (props) => {
  const auth = useContext(AuthContext);

  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/" exact>
          All Users
        </NavLink>
      </li>
      {auth.isLoggedIn && (
        <li>
          <NavLink to="/u1/places">My Places</NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <NavLink to="/places/new">Add Places</NavLink>
        </li>
      )}
      {!auth.isLoggedIn && (
        <li>
          <NavLink to="/auth">Login</NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <Button onClick={auth.logout}>Logout</Button>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
