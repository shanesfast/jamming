import { useContext } from 'react';
import { PlayListContext } from "../context/PlayListContext";
import { Spotify } from '../Spotify.js';

const useTrack = () => {
  const { state, dispatch } = useContext(PlayListContext);
  const { editBoxIsOpen, editListIsOpen, editListTracks, editListPlayLists, 
          playListTracks, playListPosition } = state;

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
    Spotify.getTracksFromPlayList(playlist_id)
    .then(data => {
      if (Array.isArray(data)) {
        return data.map(track => {
          return {
            artistName: track.artist,
            albumName: track.album,
            name: track.track,
            uri: track.uri
          }
        });
      } else if (data === undefined) {
        return []; // the state expects an array, so an empty
      }            // array is returned if there is no data to avoid errors
    })
    .then(tracks => {
      if (tracks) {
        dispatch({ type: 'SET_EDIT_LIST_TRACKS', tracks: tracks });
        dispatch({ type: 'UPDATE_SHOW_EDIT_LIST', show: false });
        dispatch({ type: 'UPDATE_SHOW_EDIT_BOX', show: true });
      }
    });
  }

  function openPlayLists(e) {
    e.preventDefault();

    if (editListIsOpen === true) {
      return dispatch({ type: 'UPDATE_SHOW_EDIT_LIST', show: false });
    }

    Spotify.getPlayLists()
    .then(playlists => {
      dispatch({ type: 'UPDATE_EDIT_PLAY_LISTS', lists: playlists });
      dispatch({ type: 'UPDATE_SHOW_EDIT_LIST', show: true });
    });
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
