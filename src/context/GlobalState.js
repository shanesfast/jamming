import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';
import { Spotify } from '../Spotify.js';

const initialState = {
  musicInfo: {
    artist: '',
    album: '',
    track: '',
  },
  sortBy: "Track",
  playListTracks: [],
  editList: 'closed',
  editListPlayLists: [{}],
  editListTracks: [],
  editBox: 'closed',
  position: 0,
  pageOfItems: []
}

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // Actions
  function updateSearch(terms) {
    if (terms.length > 0) {
      Spotify.searchArtist(terms)
      .then(artists => {
        dispatch({ type: 'UPDATE_SEARCH', payload: artists });
      });
      Spotify.searchAlbum(terms)
      .then(albums => {
        dispatch({ type: 'UPDATE_SEARCH', payload: albums });
      });
      Spotify.searchTracks(terms)
      .then(tracks => {
        dispatch({ type: 'UPDATE_SEARCH', payload: tracks });
      });
    } else {
      dispatch({
        type: 'UPDATE_SEARCH',
        payload: {
          artist: '',
          album: '',
          track: ''
        }
      })
    }
  }

  return (<GlobalContext.Provider value={{
    editBox: state.editBox,
    editList: state.editList,
    editListPlayLists: state.editListPlayLists,
    editListTracks: state.editListTracks,
    musicInfo: state.musicInfo,
    pageOfItems: state.pageOfItems,
    playListTracks: state.playListTracks,
    position: state.position,
    sortBy: state.sortBy,
    updateSearch
  }}>
    {children}
  </GlobalContext.Provider>);
}