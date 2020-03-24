import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';
import { stat } from 'fs';

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

  return (<GlobalContext.Provider value={{
    editBox: state.editBox,
    editList: state.editList,
    editListPlayLists: state.editListPlayLists,
    editListTracks: state.editListTracks,
    musicInfo: state.musicInfo,
    pageOfItems: state.pageOfItems,
    playListTracks: state.playListTracks,
    position: state.position,
    sortBy: state.sortBy
  }}>
    {children}
  </GlobalContext.Provider>);
}