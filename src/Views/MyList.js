import React from "react";
import { Link } from "react-router-dom";

import "./MyList.css";

const MyList = () => {
  const saved = localStorage.getItem("items");
  const initialValue = JSON.parse(saved);

  const noDuplicates = initialValue?.reduce((acc, curr) => {
    return acc.some((s) => s.id === curr.id) ? acc : [...acc, curr];
  }, []);

  const renderMyList = () => {
    return noDuplicates.map((value, index) => {
      return (
        <li className="myList-Items" key={value.id}>
          {renderImage(index)}
          <Link to={`/characters/${value.id}`}>{value.name}</Link>
        </li>
      );
    });
  };

  const renderImage = (index) => {
    return noDuplicates?.length === 0 ? (
      <img
        src="http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
        className="rounded-circle z-depth-2"
        alt=""
      ></img>
    ) : (
      <img
        src={`${noDuplicates[index].thumbnail.path}.${noDuplicates[index].thumbnail.extension}`}
        className="rounded-circle z-depth-2"
        alt=""
      ></img>
    );
  };

  return <ul className="fav-list">{renderMyList()}</ul>;
};

export default MyList;
