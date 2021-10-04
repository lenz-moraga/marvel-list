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
        setSearchInput(evt.target.value);
        // console.log(searchInput);
        history.push('/search/'+searchInput.split('#').join('No.'));
        setSearchInput('');
    }
    
    return (
        <div className="container">
            <div className="row height d-flex justify-content-center align-items-center">
                <div className="col-md-8">
                    <form onSubmit={onSearchHandler} >

                        <div className="d-flex">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={onChangeSearchInput} value={searchInput}></input>
                            
                            <Button cssClasses="btn btn-outline-success" searchParameterProp={searchInput} buttonType='search' value="Search" isSubmit="submit"/>
                        </div>
                        {/* <div className="d-flex my-2">
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1"></input>
                                <label class="form-check-label" for="inlineRadio1">Character</label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2"></input>
                                <label class="form-check-label" for="inlineRadio2">Comic</label>
                            </div>
                        </div> */}
                        {/* <Link to={'/search/'+searchInput} rel="noreferrer" onClick={onClickSearchHandler} className="btn btn-outline-success" type="submit">Search</Link> */}
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SearchBar;