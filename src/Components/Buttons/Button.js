import React from "react";
import { Link } from "react-router-dom";

const Button = (props) => {  
    let buttonUrl = props.buttonType;

    if (props.buttonType === 'characterView') {
        buttonUrl = '/characters/'+props.values.id; 
    } else if (props.buttonType === 'comicView') {
        buttonUrl = '/comics/'+props.values.id; 
    } else if (props.buttonType === 'comicViewAll') {
        buttonUrl = '/comics';
    } else if (props.buttonType === 'characterViewAll') {
        buttonUrl = '/characters';
    } else if (props.buttonType === 'search') {        
        if(props.searchParameterProp === '') {
            buttonUrl = '/home';
        } else {
            buttonUrl = '/search/'+props.searchParameterProp;
        }
    }    

    return (
        // <a href={props.values.urls[1].url} title={props.values.urls[1].type} onClick={onClickCharbutton} target="_blank" rel="noreferrer" className="btn btn-primary">Learn More</a>
        <Link to={buttonUrl} rel="noreferrer" className={props.cssClasses} type={props.isSubmit}>{props.value}</Link>
    );
}

export default Button;