import React, { createContext, useReducer } from 'react';
import { positionReducer } from '../reducer/PositionReducer.js';

export const PositionContext = createContext();

export const PositionProvider = ({ children }) => {
  const [state, dispatch] = useReducer(positionReducer, {
    playListPosition: 0,
  });

  return (
    <PositionContext.Provider value={{state, dispatch}}>
      {children}
    </PositionContext.Provider>
  );
}
