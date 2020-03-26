import React, { useContext } from 'react'
import { GlobalContext } from '../../context/GlobalContext';
import { DebounceInput } from 'react-debounce-input';
import { Spotify } from '../../Spotify.js';

import './SearchBar.css';

export const SearchBar = (props) => {

  const [state, setState] = useContext(GlobalContext);

  const handleSearch = (e) => {
    const terms = e.target.value;
    if (terms.length > 0) {
      if (state.sortBy === 'Artist') {
        Spotify.searchArtist(terms)
        .then(artists => {
          setState(state => ({...state, artist: artists}));
        });
      }
      if (state.sortBy === 'Album') {
        Spotify.searchAlbum(terms)
        .then(albums => {
          setState(state => ({...state, album: albums}));
        });
      }
      if(state.sortBy === 'Track') { 
        Spotify.searchTracks(terms)
        .then(tracks => {
          setState(state => ({...state, track: tracks}));
        });
      }
    } else {
      setState(state => ({...state, artist: '', album: '', track: ''}));
    }
  }

  return (
    <div className="SearchBar">
      <DebounceInput minLength={1} debounceTimeout={300} onChange={handleSearch}
        id="searchBar" placeholder="Search Spotify" />
    </div>
  );
}
