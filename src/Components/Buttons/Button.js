import React from "react";
import { Link } from "react-router-dom";

const Button = (props) => {  
    let buttonType = props.type;

    if (props.type === 'character') {
        buttonType = '/character/'+props.values.id;
    } else { 
        console.log('no info found');
    }

    const onClickCharbutton = () => {
        console.log(buttonType);
    }
    return (
        // <a href={props.values.urls[1].url} title={props.values.urls[1].type} onClick={onClickCharbutton} target="_blank" rel="noreferrer" className="btn btn-primary">Learn More</a>
        <Link to={buttonType} onClick={onClickCharbutton} rel="noreferrer" className="btn btn-primary">Learn More</Link>
    );
}

export default Button;