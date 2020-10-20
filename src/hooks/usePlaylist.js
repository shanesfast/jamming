import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { PlayListContext } from "../context/PlayListContext";

const usePlaylist = () => {
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

  function savePlayList(title) {
    let tracks = [];
    playListTracks.map(track => { return tracks = [...tracks, track.uri] });

    // Abort username request if it is taking too long
    const controller = new AbortController();
    const signal = controller.signal;
    setTimeout(() => controller.abort(), 6000);

    const titleRequest = new Request('https://api.spotify.com/v1/users/' + spotifyUsername +
    '/playlists', {
    	method: 'POST',
    	headers: {
    		'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + spotifyAccessToken
      },
      body: JSON.stringify({ name: title }),
      signal
    });

    function addPlayList() { 
      return fetch(titleRequest)
      .then(response => {
        return response.json();
      })
      .then(jsonResponse => {
        console.log(jsonResponse);
        return jsonResponse.id;
      })
      .catch(err => { alert(`Adding playlist error: ${err.message}`) });
    }

    function addTracks(trackRequest)  {
      return fetch(trackRequest)
      .then(response => {
        return response.json();
      })
      .then(jsonResponse => {
        return jsonResponse;
      })
      .catch(err => { alert(`Adding tracks to playlist error: ${err.message}`); });
    }

    
    addPlayList()
    .then(playListID => {
      let trackRequest = new Request('https://api.spotify.com/v1/users/' +
      spotifyUsername + '/playlists/' + playListID + '/tracks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + spotifyAccessToken
        },
        body: JSON.stringify({ uris: tracks }),
        signal
      });

      return trackRequest;
    })
    .then(trackRequest => { return addTracks(trackRequest) });
    
    dispatch({ type: 'CLEAR_PLAY_LIST_TRACKS', tracks: [] });
  }

  function updatePlayList(playlistId, newName, urisArray) {
    // Abort username request if it is taking too long
    const controller = new AbortController();
    const signal = controller.signal;
    setTimeout(() => controller.abort(), 6000);

    // Update playlist name if it changed
    if (newName !== editListPlayLists[playListPosition].name && newName.length > 0) {
      fetch(`https://api.spotify.com/v1/users/${spotifyUsername}/playlists/${playlistId}`,
      {
        method: 'PUT',
        headers: {
          'Authorization': 'Bearer ' + spotifyAccessToken,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: newName }),
        signal
      }
    )
    .catch(err => alert(`Error updating playlist name: ${err.message}`));
    }
    console.log(urisArray);
    // Update playlist Tracks
    const urisLength = urisArray.length;
    if (urisLength > 100) { // uses the Add Track to Playlist Endpoint if there are more than 100 tracks
      let trackOffset = Math.floor(urisLength / 100);
      let first100 = [...urisArray.slice(0, 100)];
      return fetch(`https://api.spotify.com/v1/users/${spotifyUsername}/playlists/${playlistId}/tracks`,
        {
          method: 'PUT',
          headers: {
            'Authorization': 'Bearer ' + spotifyAccessToken,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ uris: first100 }),
          signal
        }
      )
      .then(response => response.json())
      .then(jsonResponse => console.log(jsonResponse))
      .then(() => {
        for (let i = 0; i <= trackOffset; i++) {
          let offset_uris = [...urisArray.slice(trackOffset * 100, (trackOffset * 100) + 100)];
          return fetch(`https://api.spotify.com/v1/users/${spotifyUsername}/playlists/${playlistId}/tracks`,
            {
              method: 'POST',
              headers: {
                'Authorization': 'Bearer ' + spotifyAccessToken,
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ uris: offset_uris }),
              signal
            }
          )
          .then(response => response.json())
          .then(jsonResponse => console.log(jsonResponse))
          .catch(err => alert(`Error updating tracks: ${err.message}`));
        }
      });
    } else { // use replace tracks endpoint if less than 100 tracks
      return fetch(`https://api.spotify.com/v1/users/${spotifyUsername}/playlists/${playlistId}/tracks`,
        {
          method: 'PUT',
          headers: {
            'Authorization': 'Bearer ' + spotifyAccessToken,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ uris: urisArray }),
          signal
        }
      )
      .then(response => response.json())
      .then(jsonResponse => console.log(jsonResponse))
      .catch(err => alert(`Error updating tracks: ${err.message}`));
    }
  }

  return {
    addTrack,
    closeEditPlayLists,
    editBoxIsOpen,
    editListIsOpen,
    editListPlayLists, 
    editListTracks,
    playListTracks,
    playListPosition,
    removeTrack,
    savePlayList,
    populateUserPlayLists,
    updateEditPlaylistTracks,
    updatePlayList,
  }
};

export default usePlaylist;
