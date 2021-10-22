import React from "react";
import { Link } from "react-router-dom";

const Button = (props) => {
  const buttonType = props.buttonType;
  let buttonUrl = "#";

  switch (buttonType) {
    case "characterView":
      buttonUrl = `/characters/${props.values.id}`;
      break;
    case "comicView":
      buttonUrl = `/comics/${props.values.id}`;
      break;
    case "comicViewAll":
      buttonUrl = "/comics";
      break;
    case "characterViewAll":
      buttonUrl = "/characters";
      break;
    case "search":
      props.searchParameterProp &&
        (buttonUrl = `/search/${props.searchParameterProp
          .split("#")
          .join("No.")}`);
      break;
    default:
      break;
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
