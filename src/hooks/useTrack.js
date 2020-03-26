import { useContext } from 'react';
import { GlobalContext } from "../context/GlobalContext";
import { Spotify } from '../Spotify.js';

const useTrack = () => {
  const [state, setState] = useContext(GlobalContext);
  const { editBoxIsOpen, editListIsOpen, editListTracks, editListPlayLists, playListTracks, playListPosition } = state;

  function addTrack(trackInfo) {
    if (editBoxIsOpen === true) {
      if (editListTracks.find(savedTrack => savedTrack.uri === trackInfo.uri)) {
        return;
      }
      return setState(state => ({...state, editListTracks: [...editListTracks, trackInfo] }) );
    }

    if (playListTracks.find(savedTrack => savedTrack.uri === trackInfo.uri)) {
      return;
    }
    return setState(state => ({...state, playListTracks: [...playListTracks, trackInfo] }) );
  }

  function removeTrack(uri, editList=false) {
    let trackArray;

    if (editList === true) {
      trackArray = [...editListTracks]
    } else {
      trackArray = [...playListTracks];
    }

    let removeThis = trackArray.find(savedTrack => {
      if (savedTrack.uri === uri) {
        return savedTrack;
      } else {
        return null;
      }
    });

    function remove(array, element) {
      const index = array.indexOf(element);

      if (index !== -1) {
        array.splice(index, 1);
      }

      if (editList === true) {
        setState(state => ({...state, editListTracks: trackArray }) );
      } else {
        setState(state => ({...state, playListTracks: trackArray }) );
      }
    }

    remove(trackArray, removeThis);
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
        setState({
          ...state,
          editListTracks: tracks,
          editListIsOpen: false,
          editBoxIsOpen: true
        });
      }
    });
  }

  function openPlayLists(e) {
    e.preventDefault();

    if (editListIsOpen === true) {
      setState({ ...state, editListIsOpen: false });
      return;
    }

    Spotify.getPlayLists()
    .then(playlists => {
      setState({ ...state, editListPlayLists: playlists, editListIsOpen: true });
    });
  }

  function savePlayList(title) {
    let uris = [];
    playListTracks.map(track => {
      uris = [...uris, track.uri];
      return null;
    })
    Spotify.createPlayList(title, uris);
    setState({ ...state, playListTracks: [] })
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
