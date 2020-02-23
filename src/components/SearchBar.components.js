import React from "react";


const SearchBar = props => {
    return (
      <div className="nav">
        <form>
          <p id="ye">Issue Tracker</p>
          <input
            className="search"
            id="searchBox"
            type="text"
            value={props.search}
            onChange={props.searchOnChange}
          />
          <h2 className="search" id="searchText">
            Search For/Add New Project
          </h2>
        </form>
      </div>
    );
  };
  export default SearchBar