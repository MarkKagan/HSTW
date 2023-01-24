import './Navbar.css'
import {Link} from 'react-router-dom'
import React from "react";

// import PropTypes from "prop-types";

import { NavbarProps } from '../../../Types';

export default function Navbar({ mobile, setMenu }: NavbarProps) {
  return (
    <div id="nav-top-container">
      {mobile ? (
        <div id="navbar-container-mobile">
          <button
            title="toggle-menu-variable"
            id="ham-menu"
            onClick={() => setMenu((m: boolean) => !m)}
          >
            <i className="fa fa-solid fa-bars"></i>
          </button>
          <Link to="/" id="mobile-header" className="navbar-header">
            How's The World <span id="io">.io</span>
          </Link>
          <div style={{ width: "30px" }}></div>
        </div>
      ) : (
        <Link to="/" className="navbar-header">
          How's The World <span id="io">.io</span>
        </Link>
      )}
    </div>
  );
}
