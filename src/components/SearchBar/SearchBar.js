import React, { useContext } from 'react'
import { SearchContext } from '../../context/SearchContext';
import { DebounceInput } from 'react-debounce-input';

import './SearchBar.css';

export const SearchBar = (props) => {

  const { dispatch } = useContext(SearchContext);

  const handleSearch = (e) => {
    const terms = e.target.value;
    dispatch({ type: 'UPDATE_SEARCH_TERMS', search: terms });
    if (terms.length === 0) dispatch({type: 'CLEAR_SEARCH'});
  }

  return (
    <div className="SearchBar">
      <DebounceInput minLength={1} debounceTimeout={300} onChange={handleSearch}
        id="searchBar" placeholder="Search Spotify" />
    </div>
  );
}
