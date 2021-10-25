import React from "react";

const MyList = () => {
  const renderMyList = () => {

    const saved = localStorage.getItem("items");
    const initialValue = JSON.parse(saved);

    return initialValue?.map( value => {
        return <li key={value.id} >{value.id}</li>
    });
  };
  return <>{renderMyList()}</>;
};

export default MyList;
