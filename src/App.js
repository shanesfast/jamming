import React, { useContext, useEffect } from 'react';
import { SearchBar } from './components/SearchBar/SearchBar.js';
import { AppPlayList } from './components/AppPlayList/AppPlayList.js';
import { ListOfPlayLists } from './components/ListOfPlayLists/ListOfPlayLists.js';
import { Spotify } from './Spotify.js';

import { GlobalProvider, GlobalContext } from './context/GlobalContext';
import { PositionProvider } from "./context/PositionContext";

import './App.css';

const App = () => {
  const [state, setState] = useContext(GlobalContext);
  const { artist, album, track, sortBy, playListTracks, 
          editListPlayLists, editListTracks, editBoxIsOpen } = state;

  // const addEntireAlbum = (id, name) => {
  //   Spotify.getTracksFromAlbum(id, name)
  //   .then(tracks => {
  //     tracks.forEach(track => {
  //       addTrack(track);
  //     });
  //   });
  // }

  const getAlbums = (id, name) => {
    Spotify.getAlbumsFromArtist(id, name)
    .then(album => {
      setState({
        album: album,
        sortBy: "Album"
      })
    })
  }

  const handleSortByChange = (sortByOption) => {
    setState({
      sortBy: sortByOption
    });
  }

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
        <SearchBar />
        <PositionProvider>
          <AppPlayList
            artist={artist}
            album={album}
            track={track}
            playListTracks={playListTracks}
            onClick={{
              handleSortByChange: handleSortByChange,
            }}
            sortBy={sortBy}
            // addAlbum={addEntireAlbum}
            getAlbums={getAlbums}
            showEditBox={editBoxIsOpen}
            editListPlayLists={editListPlayLists}
            editListTracks={editListTracks}
            />
          <ListOfPlayLists />
        </PositionProvider>
      </div>
    </GlobalProvider>
  );
}

export default App;
