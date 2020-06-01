import React, { createContext, useReducer } from 'react';
import { authReducer } from '../reducer/AuthReducer';

const getCookieValue = (type) => {
  if (document.cookie.split(';').some((item) => item.trim().startsWith(`${type}=`))) {
    const cookieValue = document.cookie
    .split('; ')
    .find(row => row.startsWith(`${type}`))
    .split('=')[1];
    
    return cookieValue;
  }
  console.log('outside of if stmt')
}

export const AuthContext = createContext([{}, () => {}]);

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    isAuthenticated: false,
    spotifyAccessToken: getCookieValue('token'),
    spotifyClientID: '4160d0ec3a004092acdbba03d6e30a03',
    spotifyUsername: getCookieValue('username')
  });

  return (
    <AuthContext.Provider value={{state, dispatch}}>
      {children}
    </AuthContext.Provider>
  );
}