import React, { useContext, useEffect } from 'react';
import { AppPlayList } from './components/AppPlayList/AppPlayList.js';
import { ListOfPlayLists } from './components/ListOfPlayLists/ListOfPlayLists.js';
import { SearchBar } from './components/SearchBar/SearchBar.js';
import { Spotify } from './Spotify.js';

import { AuthContext, AuthProvider } from './context/AuthContext.js';
import { PlayListProvider } from './context/PlayListContext';
import { PositionProvider } from "./context/PositionContext";
import { SearchProvider } from './context/SearchContext.js';

import './App.css';

const App = () => {
  const [state] = useContext(AuthContext);
  const { isAuthenticated } = state;

  useEffect(() => {
    let abortController = new AbortController();
    let signal = abortController.signal;

    Spotify.getAccess(signal);

    return function cleanup() {
      abortController.abort();
    }
  }, [])

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
    <AuthProvider>
      <PlayListProvider>
        <div className="App">
          <h1>Quick J<i className="highlight">amm</i>in&#39;</h1>
          { isAuthenticated ? mainApp : null }
        </div>
      </PlayListProvider>
    </AuthProvider>
  );
}

export default App;
