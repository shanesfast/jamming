import React, { createContext, useState} from 'react';

export const PlayListContext = createContext([{}, () => {}]);

export const PlayListProvider = ({ children }) => {
  const [state, setState] = useState({
    playListTracks: [],
    editListIsOpen: false,
    editListPlayLists: [{}],
    editListTracks: [],
    editBoxIsOpen: false,
    playListPosition: 0,
    pageOfItems: []
  });

  return (
    <PlayListContext.Provider value={[state, setState]}>
      {children}
    </PlayListContext.Provider>
  );
}