import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { PlayListContext } from "../context/PlayListContext";
import { Spotify } from '../Spotify.js';

const useTrack = () => {
  const { state, dispatch } = useContext(PlayListContext);
  const { editBoxIsOpen, editListIsOpen, editListTracks, editListPlayLists, 
          playListTracks, playListPosition } = state;

  const { state: authState } = useContext(AuthContext);
  const { spotifyAccessToken, spotifyUsername } = authState;

  function addTrack(trackInfo) {
    if (editBoxIsOpen === true) return dispatch({ type: 'UPDATE_EDIT_LIST_TRACKS', tracks: trackInfo });
    return dispatch({ type: 'UPDATE_PLAY_LIST_TRACKS', tracks: trackInfo });
  }

  function removeTrack(uri, editList=false) {
    let trackArray;

    if (editList === true) trackArray = [...editListTracks];
    else trackArray = [...playListTracks];

    function remove(array, element) {
      const index = array.indexOf(element);
      array.splice(index, 1);

      if (editList === true) dispatch({ type: 'REMOVE_EDIT_LIST_TRACKS', tracks: array });
      else dispatch({ type: 'REMOVE_PLAY_LIST_TRACKS', tracks: array });
    }

    remove(trackArray, uri);
  }

  function getTracksFromPlayList(playlist_id) {
    let trackCount = 0; // number of songs in increments of 100
    let iterationCount = 1; // tracks number of times API call is made
    let offset = 0; // offsets track number for API call
    let playlistTracks = []; // used to store tracks gathered from each API call

    function fetchTracks() {
      return fetch(`https://api.spotify.com/v1/users/${spotifyUsername}/playlists/${playlist_id}/tracks?offset=${offset}&limit=100`,
        { headers: {
          'Authorization': 'Bearer ' + spotifyAccessToken
        }
      })
      .then(response => { return response.json() })
      .then(jsonResponse => {
        if (jsonResponse.items && jsonResponse.items.length) { 
          return jsonResponse.items.map((item, num) => {
            if (num === 99) {
              trackCount +=100;
            }
            return playlistTracks = [...playlistTracks,
              {
                track: item.track.name,
                artist: item.track.artists[0].name,
                album: item.track.album.name,
                uri: item.track.uri
              }
            ];
          });
        } else return playlistTracks;
      })
      .then(jsonResponse => {
        if (trackCount / iterationCount === 100) {
          iterationCount += 1;
          offset += 100;
          return fetchTracks();
        } else return playlistTracks;
      })
    }

    fetchTracks()
    .then(data => {
      if (data) {
        return data.map(track => {
          return {
            artistName: track.artist,
            albumName: track.album,
            name: track.track,
            uri: track.uri
          }
        });
      } else return [];
    })
    .then(tracks => {
      if (tracks) {
        dispatch({ type: 'SET_EDIT_LIST_TRACKS', tracks: tracks });
        dispatch({ type: 'UPDATE_SHOW_EDIT_LIST', show: false });
        dispatch({ type: 'UPDATE_SHOW_EDIT_BOX', show: true });
      }
    })
    .catch(err => { alert(`Getting tracks from playlist error: ${err.message}`); });
  }

  function openPlayLists(e) {
    e.preventDefault();

    if (editListIsOpen === true) {
      return dispatch({ type: 'UPDATE_SHOW_EDIT_LIST', show: false });
    }

    fetch("https://api.spotify.com/v1/me/playlists", { headers: {
      'Authorization': 'Bearer ' + spotifyAccessToken
      }
    })
    .then(response => { return response.json() })
    .then(jsonResponse => {
      if (jsonResponse.items.length) {
        return jsonResponse.items.map((items, num) => {
          return {
            name: items.name,
            count: items.tracks.total,
            id: items.id,
            user: spotifyUsername,
            position: num
          }
        });
      } else {
        return;
      }

    })
    .then(playlists => {
      dispatch({ type: 'UPDATE_EDIT_PLAY_LISTS', lists: playlists });
      dispatch({ type: 'UPDATE_SHOW_EDIT_LIST', show: true });
    })
    .catch(err => { alert(`Getting playlists error: ${err.message}`); });
  }

  function savePlayList(title) {
    let uris = [];
    playListTracks.map(track => {
      uris = [...uris, track.uri];
      return null;
    })
    Spotify.createPlayList(title, uris);
    dispatch({ type: 'CLEAR_PLAY_LIST_TRACKS', tracks: [] });
  }

  function updatePlayList(playlist_id, new_name, uris_array) {
    if (new_name !== editListPlayLists[playListPosition].name && new_name.length > 0) {
      Spotify.updatePlaylistName(playlist_id, new_name);
    }

    Spotify.updatePlaylistTracks(playlist_id, uris_array);
  }

  return {
    addTrack,
    editBoxIsOpen,
    editListIsOpen,
    editListPlayLists, 
    editListTracks,
    getTracksFromPlayList,
    openPlayLists,
    playListTracks,
    playListPosition,
    removeTrack,
    savePlayList,
    updatePlayList,
  }
};

export default useTrack;
