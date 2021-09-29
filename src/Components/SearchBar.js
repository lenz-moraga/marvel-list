import React from "react";

const SearchBar = () => {
    
    return (
        <div className="container">
            <div className="row height d-flex justify-content-center align-items-center">
                <div className="col-md-8">
                    <form className="d-flex">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"></input>
                        <button className="btn btn-outline-success" type="submit">Search</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SearchBar;