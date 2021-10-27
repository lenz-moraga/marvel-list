import React from "react";

const FilterSection = (props) => {
  const renderFilters = () => {
    if (!props.filterData.length) return;

    let filteredList = Object.values(props.filterData);

    if (props.filterGroup !== "Search Type") {
      filteredList = Object.values(props.filterData).reduce((acc, curr) => {
        return acc.some((s) => s.resourceURI === curr.resourceURI) || !curr.name
          ? acc
          : [...acc, curr];
      }, []);
    }

    return filteredList.map((val) => {
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
            onChange={props.onFilterChange}
            checked={props.selectedRadioButton === id}
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
          id={props.filterGroup}
          onChange={props.onFilterChange}
          checked={props.selectedRadioButton === "all"}
        />
        <label
          className="form-check-label text-capitalize"
          htmlFor={props.filterGroup}
        >
          all
        </label>
      </div>
      {renderFilters()}
    </div>
  );
};

export default FilterSection;
