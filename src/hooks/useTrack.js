import { useContext } from 'react';
import { GlobalContext } from "../context/GlobalState";

const useTrack = () => {
  const [state, setState] = useContext(GlobalContext);
  const { editBox, editListTracks, playListTracks } = state;

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

  return {
    addTrack,
    editBox, 
    editListTracks,
    playListTracks,
    removeTrack,
  }
};

export default useTrack;
