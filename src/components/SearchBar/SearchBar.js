import React, {useState, useContext} from 'react'
import { GlobalContext } from '../../context/GlobalState';
import { DebounceInput } from 'react-debounce-input';

import './SearchBar.css';

export const SearchBar = (props) => {

  const { updateSearch } = useContext(GlobalContext);

  const handleSearch = (e) => {
    const terms = e.target.value;
    updateSearch(terms);
  }

  return (
    <div className="SearchBar">
      <DebounceInput minLength={1} debounceTimeout={300} onChange={handleSearch}
        id="searchBar" placeholder="Search Spotify" />
    </div>
  );
}
