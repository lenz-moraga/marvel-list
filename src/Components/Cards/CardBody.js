import React from "react";
import Button from "../Button";

const CardBody = (props) => {
  const charObject = props.values;
  const noDescriptionAvailable = (desc) => {
    if (desc != null && desc?.length !== 0) return desc;
    return `There is no description available for this ${charObject.type}, visit the link below for more info...`;
  };

  return (
    <div className="card-body cards__body">
      <h5 className="cards__body-title">{charObject.name}</h5>
      <p className="cards__body-text">{noDescriptionAvailable(charObject.desc)}</p>
      <Button
        values={charObject}
        buttonType={props.from}
        value="Learn More"
        cssClasses="btn btn-primary card-button"
      />
    </div>
  );
};

export default CardBody;
