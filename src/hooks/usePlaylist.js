import { useContext } from 'react';
import { PlayListContext } from "../context/PlayListContext";

const usePlaylist = () => {
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

  function updateEditPlaylistTracks(tracks) {
    dispatch({ type: 'SET_EDIT_LIST_TRACKS', tracks: tracks });
    dispatch({ type: 'UPDATE_SHOW_EDIT_LIST', show: false });
    dispatch({ type: 'UPDATE_SHOW_EDIT_BOX', show: true });
  }

  function closeEditPlayLists() {
    if (editListIsOpen === true) {
      dispatch({ type: 'UPDATE_SHOW_EDIT_LIST', show: false });
      return true;
    }

    return false;
  }

  function populateUserPlayLists(playlists) {
    dispatch({ type: 'UPDATE_EDIT_PLAY_LISTS', lists: playlists });
    dispatch({ type: 'UPDATE_SHOW_EDIT_LIST', show: true });
  }

  function clearPlayListTracks() {
    dispatch({ type: 'CLEAR_PLAY_LIST_TRACKS', tracks: [] });
  }

  return {
    addTrack,
    clearPlayListTracks,
    closeEditPlayLists,
    editBoxIsOpen,
    editListIsOpen,
    editListPlayLists, 
    editListTracks,
    playListTracks,
    playListPosition,
    removeTrack,
    populateUserPlayLists,
    updateEditPlaylistTracks
  }
};

export default usePlaylist;
