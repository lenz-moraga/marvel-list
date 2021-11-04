import React, { Fragment } from 'react';
import { Link, NavLink } from 'react-router-dom';

import logo from '../../Assets/Images/marvel-logo.png';

const Navbar = () => {
  return (
    <Fragment>
      <nav className="navbar navbar-expand-lg navbar-light my-4 navigation-bar">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/home">
            <img src={logo} alt="marvel logo" className="app-logo application-logo"/>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 navigation-list">
              <li className="nav-item navigation-items">
                <NavLink
                  activeClassName="active"
                  className="nav-link navigation-links"
                  to="/home"
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item navigation-items">
                <NavLink
                  activeClassName="active"
                  className="nav-link navigation-links"
                  to="/characters"
                >
                  Characters
                </NavLink>
              </li>
              <li className="nav-item navigation-items">
                <NavLink
                  activeClassName="active"
                  className="nav-link navigation-links"
                  to="/comics"
                >
                  Comics
                </NavLink>
              </li>
              <li className="nav-item navigation-items">
                <NavLink
                  activeClassName="active"
                  className="nav-link navigation-links"
                  to="/my-list"
                >
                  My List{' '}
                  <small>
                    <i className="fas fa-plus"></i>
                  </small>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </Fragment>
  );
};

export default Navbar;
