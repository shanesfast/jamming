import React, { useContext, useEffect } from 'react';
import { AppPlayList } from './components/AppPlayList/AppPlayList.js';
import { ListOfPlayLists } from './components/ListOfPlayLists/ListOfPlayLists.js';
import { SearchBar } from './components/SearchBar/SearchBar.js';

import { AuthContext } from './context/AuthContext.js';
import { PlayListProvider } from './context/PlayListContext';
import { PositionProvider } from './context/PositionContext';
import { SearchProvider } from './context/SearchContext.js';

import './App.css';

const App = () => {
  const { state, dispatch } = useContext(AuthContext);
  const { isAuthenticated, spotifyAccessToken } = state;

  useEffect(() => {
    if (spotifyAccessToken) dispatch({ type: 'PRIOR_SESSION' });
  }, [dispatch, isAuthenticated, spotifyAccessToken])

  const mainApp = (
    <SearchProvider>
      <SearchBar />
      <PositionProvider>
        <AppPlayList />
        <ListOfPlayLists />
      </PositionProvider>
    </SearchProvider>
  );

  return (
    <PlayListProvider>
      <div className="App">
        <h1>Quick J<i className="highlight">amm</i>in&#39;</h1>
        { isAuthenticated ? mainApp : null }
      </div>
    </PlayListProvider>
  );
}

export default App;
