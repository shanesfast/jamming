import React, { createContext, useState} from 'react';

export const GlobalContext = createContext([{}, () => {}]);

export const GlobalProvider = ({ children }) => {
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
    <GlobalContext.Provider value={[state, setState]}>
      {children}
    </GlobalContext.Provider>
  );
}