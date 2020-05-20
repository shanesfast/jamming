import { useContext, useEffect, useState } from 'react';
import SpotifyWrapper from 'spotify-wrapper';
import { v4 as uuidv4 } from 'uuid';
import 'whatwg-fetch';
import { AuthContext } from '../context/AuthContext';
import { SearchContext } from '../context/SearchContext';
import useTrack from './useTrack';


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
    function searchArtist(terms) {
      const spotifyWrap = new SpotifyWrapper({
        token: spotifyAccessToken
      });
      
      spotifyWrap.search.artists(terms)
      .then(data => {
        if (data.artists.items && data.artists.items.length) {
          return data.artists.items.map((artist) => {
            return {
              name: artist.name,
              img: artist.images.length ? artist.images : [{url: './missing_photo.jpg'}],
              id: artist.id
            };
          });
        } else return 'empty';
      })
      .then(artists => {
        return setArtistResult(artists);
      })
      .catch(err => alert(err.message));
    }
  
    function searchAlbum(terms) {
      const spotifyWrap = new SpotifyWrapper({
        token: spotifyAccessToken
      });
  
      spotifyWrap.search.albums(terms)
      .then(data => {
        if (data.albums.items && data.albums.items.length) {
          return data.albums.items.map((album, i) => {
            return {
              albumName: album.name,
              artistName: album.artists.length ? album.artists : 'No Artist Found',
              img: album.images.length? album.images : [{url: './missing_photo.jpg'}],
              id: album.id
            }
          });
        } else return 'empty';
      })
      .then(albums => {
        return setAlbumResult(albums);
      })
      .catch(err => alert(err.message));
    }
  
    function searchTrack(terms) {
      const spotifyWrap = new SpotifyWrapper({
        token: spotifyAccessToken
      });
      
      spotifyWrap.search.tracks(terms)
      .then(data => {
        if (data.tracks.items && data.tracks.items.length) {
          return data.tracks.items.map((track) => {
            return {
              name: track.name,
              artistName: track.artists.length ? track.artists : 'No Artist Found',
              albumName: track.album.name,
              uri: track.uri
            } 
          });
        } else return 'empty';
      })
      .then(tracks => {
        return setTrackResult(tracks);
      })
      .catch(err => alert(err.message));
    }

    function searchSpotify() {
      if (searchTerms.length > 0) {
        if (sortBy === 'Artist') return searchArtist(searchTerms);
        if (sortBy === 'Album') return searchAlbum(searchTerms);
        if (sortBy === 'Track') return searchTrack(searchTerms);
      }
    }

    searchSpotify();
  }, [searchTerms, sortBy, spotifyAccessToken]);

  function getTracksFromAlbum(id, name) {
    const spotifyWrap = new SpotifyWrapper({
      token: spotifyAccessToken
    });

    return spotifyWrap.album.getTracks(id)
    .then(data => {
      if (data.items && data.items.length) {
        return data.items.map((track, i) => {
          if (data.items[i].artists.length) {
            return {
              name: track.name,
              artistName: track.artists[0].name,
              albumName: name,
              uri: track.uri
            }
          } else {
            return {
              name: track.name,
              artistName: 'NoArtistFound',
              albumName: name,
              uri: track.uri
            }
          }
        })
      }
    })
    .then(tracks => { tracks.forEach(track => { addTrack(track) }) });
  }

  function getAlbumsFromArtist(id, artistName) {
    const albumRequest = new Request('https://api.spotify.com/v1/artists/' +
    id + '/albums', {
    	headers: {
        'Authorization': 'Bearer ' + spotifyAccessToken
      }
    })

    fetch(albumRequest)
    .then(response => { return response.json() })
    .then(jsonResponse => { return jsonResponse })
    .catch(err => { console.log(err) })
    .then(data => {
      if (data.items && data.items.length) {
        return data.items.map((albums) => {
          if (albums.images.length) {
            return {
              albumName: albums.name,
              artistName: [{name: artistName}],
              id: albums.id,
              img: albums.images
            }
          } else {
            return {
              albumName: albums.name,
              artistName: [{name: artistName}],
              id: albums.id,
              img: [{url: './missing_photo.jpg'}]
            }
          }
        });
      }
    })
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
          + spotifyRedirectUri + "&scope=" + scope + "&state=" + uuidv4() + "&show_dialog=true";

    let popup = window.open(urlRequest, 'Sign in with Spotify', 'width=800,height=600');

    window.spotifyCallback = (token, expire) => {
      popup.close();
      authDispatch({ type: 'SET_ACCESS_TOKEN', token });
      localStorage.setItem('token', token);

      // Clear token from local storage after it expires
      setTimeout(() => localStorage.clear('token'), expire);

      // Abort username request if it is taking too long
      const controller = new AbortController();
      const signal = controller.signal;
      setTimeout(() => controller.abort(), 6000);

      // gets username
      fetch("https://api.spotify.com/v1/me", { headers: {
        'Authorization': 'Bearer ' + token
      }, signal })
      .then(response => { return response.json() })
      .then(response => { authDispatch({ type: 'SET_USERNAME', username: response.id }); })
      .catch(err => { console.log(err) });
    }
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