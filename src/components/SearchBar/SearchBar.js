import React from 'react';
import { DebounceInput } from 'react-debounce-input';
import './SearchBar.css';

export const SearchBar = (props) => {

  const handleSearch = (e) => {
    const terms = e.target.value;
    props.onChange(terms);
  }

  return (
    <div className="SearchBar">
      <DebounceInput minLength={1} debounceTimeout={300} onChange={handleSearch}
        id="searchBar" placeholder="Search Spotify" />
    </div>
  );
}
