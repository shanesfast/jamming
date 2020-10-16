import React, { createContext, useReducer } from 'react';
import { searchReducer } from '../reducer/SearchReducer.js';

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [state, dispatch] = useReducer(searchReducer, {
    artist: '',
    album: '',
    track: '',
    searchTerms: '',
    sortBy: 'Track',
  });

  return (
    <SearchContext.Provider value={{state, dispatch}}>
      {children}
    </SearchContext.Provider>
  );
}