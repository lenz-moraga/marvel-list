import React from "react";
import Button from "../Buttons/Button";

const CardBody = (props) => {
  const charObject = props.values;
  const noDescriptionAvailable = (desc) => {
    if (desc != null && desc?.length !== 0) return desc;
    return `There is no description available for this ${charObject.type}, visit the link below for more info...`;
  };

  return (
    <div className="card-body">
      <h5 className="card-title">{charObject.name}</h5>
      <p className="card-text">{noDescriptionAvailable(charObject.desc)}</p>
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
