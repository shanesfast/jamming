import React, { createContext, useReducer } from 'react';
import { authReducer } from '../reducer/AuthReducer';

export const AuthContext = createContext([{}, () => {}]);

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    isAuthenticated: false,
    spotifyAccessToken: null,
    spotifyClientID: '4160d0ec3a004092acdbba03d6e30a03',
    spotifyUsername: null
  });

  const { spotifyAccessToken, spotifyClientID, spotifyRedirectUri, spotifyUsername } = state;

  function getSpotifyAccess(signal) {
    const url = 'https://accounts.spotify.com/authorize';
    const scope = 'user-read-private user-read-email ' +
    'playlist-modify-private playlist-read-private ' +
    'playlist-modify-public playlist-read-collaborative';
    const urlRequest = url + "?client_id=" + spotifyClientID + "&response_type=token&redirect_uri="
          + spotifyRedirectUri + "&scope=" + scope + "&state=" + state;

    if (spotifyAccessToken) {
      dispatch({ type: 'PRIOR_SESSION_AUTH' });
    } else if (window.location.href.match(/access_token=([^&]*)/)) {
        let accessTokenArr = window.location.href.match(/access_token=([^&]*)/);
        spotifyAccessToken = accessTokenArr[1].toString();
    } else {
        window.location = urlRequest;
    }

    // gets user ID
    fetch("https://api.spotify.com/v1/me", { headers: {
       'Authorization': 'Bearer ' + spotifyAccessToken
     }, signal: signal
    })
    .then(response => {
      return response.json()
    })
    .then(jsonResponse => {
      spotifyUsername = jsonResponse.id;
    })
    .catch(err => { 
      console.log(err) 
    });
  }

  return (
    <AuthContext.Provider value={{state, dispatch}}>
      {children}
    </AuthContext.Provider>
  );
}