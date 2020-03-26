import { useContext } from 'react';
import { GlobalContext } from "../context/GlobalState";
import { Spotify } from '../Spotify.js';

const useTrack = () => {
  const [state, setState] = useContext(GlobalContext);
  const { editBox, openEditList, editListTracks, editListPlayLists, playListTracks, position } = state;

  function addTrack(trackInfo) {
    if (editBox === 'open') {
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
          openEditList: false,
          editBox: 'open'
        });
      }
    });
  }

  function getPosition(spot) {
    if (spot === position) {
      return;
    } else {
      setState({ ...state, position: spot });
    }
  }

  function openPlayLists(e) {
    console.log(openEditList);
    e.preventDefault();

    if (openEditList === true) {
      setState({ ...state, openEditList: false });
      return;
    }

    Spotify.getPlayLists()
    .then(playlists => {
      setState({ ...state, editListPlayLists: playlists, openEditList: true });
    });
    console.log(openEditList);
  }

  return {
    addTrack,
    editBox,
    editListPlayLists, 
    editListTracks,
    getPosition,
    getTracksFromPlayList,
    openPlayLists,
    playListTracks,
    position,
    removeTrack,
    state, 
    setState
  }
};

export default useTrack;
