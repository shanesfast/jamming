import React, { createContext, useReducer } from 'react';
import { playListReducer } from '../reducer/PlayListReducer.js';

export const PlayListContext = createContext([{}, () => {}]);

export const PlayListProvider = ({ children }) => {
  const [state, dispatch] = useReducer(playListReducer, {
    editBoxIsOpen: false,
    editListIsOpen: false,
    editListPlayLists: [{}],
    editListTracks: [],
    pageOfItems: [],
    playListPosition: 0,
    playListTracks: [],
  });

  return (
    <PlayListContext.Provider value={{state, dispatch}}>
      {children}
    </PlayListContext.Provider>
  );
}