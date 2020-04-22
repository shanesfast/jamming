import React, { useEffect } from 'react';
import { SearchBar } from './components/SearchBar/SearchBar.js';
import { AppPlayList } from './components/AppPlayList/AppPlayList.js';
import { ListOfPlayLists } from './components/ListOfPlayLists/ListOfPlayLists.js';
import { Spotify } from './Spotify.js';

import { PlayListProvider } from './context/PlayListContext';
import { PositionProvider } from "./context/PositionContext";
import { SearchProvider } from './context/SearchContext.js';

import './App.css';

const App = () => {

  useEffect(() => {
    let abortController = new AbortController();
    let signal = abortController.signal;

    Spotify.getAccess(signal);

    return function cleanup() {
      abortController.abort();
    }
  }, [])

  return (
    <PlayListProvider>
      <div className="App">
        <h1>Quick J<i className="highlight">amm</i>in&#39;</h1>
        <SearchProvider>
          <SearchBar />
          <PositionProvider>
            <AppPlayList />
            <ListOfPlayLists />
          </PositionProvider>
        </SearchProvider>
      </div>
    </PlayListProvider>
  );
}

export default App;
