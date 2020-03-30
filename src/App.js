import React, { useEffect } from 'react';
import { SearchBar } from './components/SearchBar/SearchBar.js';
import { AppPlayList } from './components/AppPlayList/AppPlayList.js';
import { ListOfPlayLists } from './components/ListOfPlayLists/ListOfPlayLists.js';
import { Spotify } from './Spotify.js';

import { GlobalProvider } from './context/GlobalContext';
import { PositionProvider } from "./context/PositionContext";
import { SearchProvider } from './context/SearchContext.js';

import './App.css';

const App = () => {

  // const getAlbums = (id, name) => {
  //   Spotify.getAlbumsFromArtist(id, name)
  //   .then(album => {
  //     setState({
  //       album: album,
  //       sortBy: "Album"
  //     })
  //   })
  // }

  useEffect(() => {
    let abortController = new AbortController();
    let signal = abortController.signal;

    Spotify.getAccess(signal);

    return function cleanup() {
      abortController.abort();
    }
  }, [])

  return (
    <GlobalProvider>
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
    </GlobalProvider>
  );
}

export default App;
