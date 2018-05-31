import React from 'react';
import './SearchBar.css';

export const SearchBar = (props) => {

  const handleSearch = (e) => {
    const terms = e.target.value;
    props.onChange(terms);
  }

  return (
    <div className="SearchBar">
      <input id="searchBar" placeholder="Search Spotify" onChange={handleSearch} />
    </div>
  );
}
