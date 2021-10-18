import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Button from "../Buttons/Button";

const SearchBar = () => {
  const [searchInput, setSearchInput] = useState("");
  let history = useHistory();

  const onChangeSearchInput = ({ target: { value } }) => setSearchInput(value);

  const onSearchHandler = (evt) => {
    evt.preventDefault();
    setSearchInput(evt.target.value);
    history.push("/search/" + searchInput.split("#").join("No."));
    setSearchInput("");
  };

  return (
    <div className="container">
      <div className="row height d-flex justify-content-center align-items-center">
        <div className="col-md-8">
          <form onSubmit={onSearchHandler}>
            <div className="d-flex">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search characters or comics"
                aria-label="Search"
                onChange={onChangeSearchInput}
                value={searchInput}
              ></input>
              <Button
                cssClasses="btn btn-outline-success"
                searchParameterProp={searchInput}
                buttonType="search"
                value="Search"
                isSubmit="submit"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
