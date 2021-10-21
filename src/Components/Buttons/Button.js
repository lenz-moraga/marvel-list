import React from "react";
import { Link } from "react-router-dom";

const Button = (props) => {
  let buttonUrl = "#";

  if (props.buttonType === "characterView") {
    buttonUrl = "/characters/" + props.values.id;
  } else if (props.buttonType === "comicView") {
    buttonUrl = "/comics/" + props.values.id;
  } else if (props.buttonType === "comicViewAll") {
    buttonUrl = "/comics";
  } else if (props.buttonType === "characterViewAll") {
    buttonUrl = "/characters";
  } else if (props.buttonType === "search") {
    if (props.searchParameterProp) {
      buttonUrl = "/search/" + props.searchParameterProp.split("#").join("No.");
    }
  }

  return (
    <Link
      to={buttonUrl}
      rel="noreferrer"
      className={props.cssClasses}
      type={props.isSubmit}
    >
      {props.value}
    </Link>
  );
};

export default Button;
