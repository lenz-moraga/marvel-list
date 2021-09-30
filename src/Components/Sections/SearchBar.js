import React, {useState} from "react";
import { useHistory } from "react-router-dom";
import Button from "../Buttons/Button";

const SearchBar = () => {
    const [searchInput, setSearchInput] = useState('');
    // const [searchParameter, setSearchParameter] = useState('');

    let history = useHistory();

    const onChangeSearchInput = (evt) => {
        setSearchInput(evt.target.value);
    }

    const onSearchHandler = (evt) => {
        evt.preventDefault();
        history.push('/search/'+searchInput);
        setSearchInput('');
    }
    
    return (
        <div className="container">
            <div className="row height d-flex justify-content-center align-items-center">
                <div className="col-md-8">
                    <form className="d-flex" onSubmit={onSearchHandler} >
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={onChangeSearchInput} value={searchInput}></input>
                        
                        <Button cssClasses="btn btn-outline-success" searchParameterProp={searchInput} buttonType='search' value="Search" isSubmit="submit"/>

                        {/* <Link to={'/search/'+searchInput} rel="noreferrer" onClick={onClickSearchHandler} className="btn btn-outline-success" type="submit">Search</Link> */}
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SearchBar;