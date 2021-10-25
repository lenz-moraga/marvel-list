import React from "react";
import { Link, NavLink} from 'react-router-dom';

const Navbar = (props) => {

    return(
        <nav className="navbar navbar-expand-lg navbar-light bg-light my-4">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/home">{props.brand}</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <NavLink activeClassName="active" className="nav-link" to="/home">Home</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink activeClassName="active" className="nav-link" to="/characters">Characters</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink activeClassName="active" className="nav-link" to="/comics">Comics</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink activeClassName="active" className="nav-link" to="/my-list">My List <small><i className="fas fa-plus"></i></small></NavLink>
                    </li>
                </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;