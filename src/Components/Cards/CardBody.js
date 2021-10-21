import React from "react";

import Button from "../Buttons/Button";

import "./CardBody.css";

const CardBody = (props) => {
  const charObject = props.values;
  const noDescriptionAvailable = (desc) => {
    if (!desc || desc.length === 0) {
      return (desc =
        "There is no description available for this " +
        charObject.type +
        ", visit the link below for more info...");
    }

    return desc;

    // return desc.length > 100 ? `${desc.substring(0, 75)}...` : desc;
  };

  return (
    <div className="card-body">
      <h5 className="card-title">{props.values.name}</h5>
      <p className="card-text">{noDescriptionAvailable(props.values.desc)}</p>

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
