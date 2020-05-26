import React, { createContext, useReducer } from 'react';
import { authReducer } from '../reducer/AuthReducer';

export const AuthContext = createContext([{}, () => {}]);

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    isAuthenticated: false,
    spotifyAccessToken: localStorage.getItem('token'),
    spotifyClientID: '4160d0ec3a004092acdbba03d6e30a03',
    spotifyUsername: localStorage.getItem('username')
  });

  return (
    <AuthContext.Provider value={{state, dispatch}}>
      {children}
    </AuthContext.Provider>
  );
}