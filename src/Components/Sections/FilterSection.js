import React from "react";

const FilterSection = (props) => {

  const renderFilters = () => {
    if (!props.filterData.length) return;

    let storyListFiltered = Object.values(props.filterData);

    if (props.filterGroup !== "Search Type") {
      storyListFiltered = Object.values(props.filterData).reduce(
        (acc, curr) => {
          return acc.some((s) => s.resourceURI === curr.resourceURI) ||
            !curr.name
            ? acc
            : [...acc, curr];
        },
        []
      );
    }

    return storyListFiltered.map((val) => {
      const id =
        val.resourceURI.split("/comics/")[1] ||
        val.resourceURI.split("/stories/")[1] ||
        val.resourceURI.split("/type/")[1];

      return (
        <div className="form-check" key={id}>
          <input
            className="form-check-input"
            name={props.filterGroup}
            type="radio"
            value={id}
            id={id}
            onChange={props.onFilterChangeHandler}
          />
          <label className="form-check-label text-capitalize" htmlFor={id}>
            {val.name}
          </label>
        </div>
      );
    });
  };

  return (
    <div className="filter-container">
      <div className="form-check">
        <input
          className="form-check-input"
          name={props.filterGroup}
          type="radio"
          value="all"
          id="all"
          onChange={props.onFilterChangeHandler}
          checked={props.isChecked}
        />
        <label className="form-check-label text-capitalize" htmlFor="all">
          all
        </label>
      </div>
      {renderFilters()}
    </div>
  );
};

export default FilterSection;
