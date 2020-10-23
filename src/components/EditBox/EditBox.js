import React, { useContext, useRef } from 'react';
import usePlaylist from '../../hooks/usePlaylist';
import useSpotify from '../../hooks/useSpotify';
import { PositionContext } from '../../context/PositionContext';

import './EditBox.css';

const EditBox = () => {
  const newNameRef = useRef();

  const { state } = useContext(PositionContext);
  const { playListPosition } = state;
  
  const { editBoxIsOpen, editListPlayLists, editListTracks, removeTrack } = usePlaylist();
  const { openPlayLists, updatePlayList } = useSpotify();
    

  const handleEditListClick = (e) => {
    e.preventDefault();
    openPlayLists(e);
  }

  const handleUpdateClick = (playListId) => {
    let newName = newNameRef.current.value;
    let uris = editListTracks.map(track => { return track.uri; });
    updatePlayList(playListId, newName, uris);
  }

  const renderEditTracks = () => {
    if (Array.isArray(editListTracks) && editListTracks.length > 0) {
      return (
        <>
          {
            editListTracks.map((track, index) => {
              return (
                <div key={`${track.uri}:${index}`} className="Track">
                  <div className="Track-information" id="track">
                    <h3>{track.name}</h3>
                    <p>{track.artistName} | {track.albumName}</p>
                  </div>
                  <button className="Track-action"
                    onClick={() => removeTrack(index, true)}>-</button>
                </div>
              );
            })
          }
        </>
      );
    } else {
      return(<><br /><p>Add some tracks!</p></>);
    }
  }

  if (editBoxIsOpen === true) {
      return (
        <div className="Editlist">
            <div className="Show-playlist-list" onClick={handleEditListClick}>
              Edit playlists</div>
          <input id="edit-title" placeholder={editListPlayLists[playListPosition].name} ref={newNameRef}></input>
          <button className="Editlist-save" onClick={() => handleUpdateClick(editListPlayLists[playListPosition].id)}>
          <b>UPDATE ON SPOTIFY</b></button>
          <div className="Track-counter">Number of tracks: {editListTracks.length}</div>
          <div className="TrackList">
            { renderEditTracks() }
          </div>
        </div>
      );
  }

  return null;
}

export default EditBox;
