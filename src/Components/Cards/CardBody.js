import React from "react";

import Button from '../Buttons/Button';

const CardBody = (props) => {

    const charObject = props.values;
    const truncate = (desc) => {
        if (desc === '' || desc == null) {
            desc = "There is no description available for this "+charObject.type+", visit the link below for more info...";
        } 
        
        return desc.length > 100 ? desc.substring(0, 75) + "..." : desc;
    }

    return (
        <div className="card-body" style={{justifyContent:"space-between", display:"inline-flex", flexDirection:"column"}}>
            <h5 className="card-title">{props.values.name.length > 30 ? (props.values.name).substring(0, 30) + "..." : props.values.name}</h5>
            <p className="card-text">{truncate(props.values.desc)}</p>
            
            <Button values={charObject} buttonType={props.from} value="Learn More" cssClasses="btn btn-primary card-button"/>
        </div>
    );
}

export default CardBody;