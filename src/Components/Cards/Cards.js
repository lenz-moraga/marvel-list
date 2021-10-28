import React from "react";
import CardBody from "./CardBody";

const Cards = (props) => {
  const charObject = props.values;
  const buttonFrom = props.values.from;

  return (
    <React.Fragment>
      <div className="col">
        <div className="card pt-3">
          <img
            src={`${charObject.thumbnail.path}.${charObject.thumbnail.extension}`}
            className="card-img-top"
            alt="..."
          ></img>
          <CardBody values={charObject} from={buttonFrom} />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Cards;
