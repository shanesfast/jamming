import React, { createContext, useState} from 'react';

export const GlobalContext = createContext([{}, () => {}]);

export const GlobalProvider = ({ children }) => {
  const [state, setState] = useState({
    artist: '',
    album: '',
    track: '',
    sortBy: "Track",
    playListTracks: [],
    openEditList: true,
    editListPlayLists: [{}],
    editListTracks: [],
    editBox: 'closed',
    position: 0,
    pageOfItems: []
  });

  return (
    <GlobalContext.Provider value={[state, setState]}>
      {children}
    </GlobalContext.Provider>
  );
}