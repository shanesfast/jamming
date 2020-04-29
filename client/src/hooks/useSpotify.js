import { useContext, useEffect, useState } from 'react';

import useTrack from './useTrack';

import { AuthContext } from '../context/AuthContext';
import { SearchContext } from '../context/SearchContext';

import { Spotify } from '../Spotify';

const useSpotify = () => {
  const [artistResult, setArtistResult] = useState();
  const [albumResult, setAlbumResult] = useState();
  const [trackResult, setTrackResult] = useState();

  const { state } = useContext(SearchContext);
  const { searchTerms, sortBy } = state;

  const { state: authState, dispatch: authDispatch } = useContext(AuthContext);
  const { spotifyAccessToken, spotifyClientID } = authState;

  const { addTrack } = useTrack();

  useEffect(() => {
    async function searchSpotify() {
      if (searchTerms.length > 0) {
        if (sortBy === 'Artist') return searchArtist(searchTerms);
        if (sortBy === 'Album') return searchAlbum(searchTerms);
        if (sortBy === 'Track') return searchTrack(searchTerms);
      }
    }

    searchSpotify();
  }, [searchTerms, sortBy]);

  function searchArtist(terms) {
    Spotify.searchArtist(terms)
            .then(artists => {
              return setArtistResult(artists);
            });
  }

  function searchAlbum(terms) {
    Spotify.searchAlbum(terms)
          .then(albums => {
            return setAlbumResult(albums);
          });
  }

  function searchTrack(terms) {
    Spotify.searchTracks(terms)
          .then(tracks => {
            return setTrackResult(tracks);
          });
  }

  function getTracksFromAlbum(id, name, signal) {
    Spotify.getTracksFromAlbum(id, name, signal)
    .then(tracks => { tracks.forEach(track => { addTrack(track) }) });
  }

  function getAlbumsFromArtist(id, name, signal) {
    Spotify.getAlbumsFromArtist(id, name, signal)
    .then(albums => { 
      return setAlbumResult(albums) });
  }

  function getSpotifyAccess() {
    const scope = 'user-read-private user-read-email ' +
    'playlist-modify-private playlist-read-private ' +
    'playlist-modify-public playlist-read-collaborative';
    const spotifyRedirectUri = process.env.REACT_APP_REDIRECT_URI;
    const url = 'https://accounts.spotify.com/authorize';
    const urlRequest = url + "?client_id=" + spotifyClientID + "&response_type=token&redirect_uri="
          + spotifyRedirectUri + "&scope=" + scope + "&state=" + state;

    if (spotifyAccessToken) authDispatch({ type: 'PRIOR_SESSION' });
    else if (window.location.href.match(/access_token=([^&]*)/)) {
      let accessTokenArr = window.location.href.match(/access_token=([^&]*)/);
      authDispatch({ type: 'SET_ACCESS_TOKEN', token: accessTokenArr[1].toString() });
    } 
    else window.location = urlRequest;

    // Abort username request if it is taking too long
    const controller = new AbortController();
    const signal = controller.signal;
    setTimeout(()=> controller.abort(), 6000);

    // gets user ID
    fetch("https://api.spotify.com/v1/me", { headers: {
       'Authorization': 'Bearer ' + spotifyAccessToken
     }, signal })
    .then(response => { return response.json() })
    .then(response => { authDispatch({ type: 'SET_USERNAME', username: response.id }); })
    .catch(err => { console.log(err) });
  }

  return {
    artistResult,
    albumResult,
    getAlbumsFromArtist,
    getTracksFromAlbum,
    getSpotifyAccess,
    trackResult
  }
}

export default useSpotify;