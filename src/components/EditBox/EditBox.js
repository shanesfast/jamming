import React, { useContext, useRef } from 'react';
import usePlaylist from '../../hooks/usePlaylist';
import { PositionContext } from '../../context/PositionContext';
import EditBoxTracks from '../EditBoxTracks/EditBoxTracks';

import './EditBox.css';

const EditBox = () => {
  const newNameRef = useRef();

  const { state } = useContext(PositionContext);
  const { playListPosition } = state;
  
  const { editBoxIsOpen, editListPlayLists, editListTracks, 
          openPlayLists, updatePlayList } = usePlaylist();
    

  const handleEditListClick = (e) => {
    e.preventDefault();
    openPlayLists(e);
  }

  const handleUpdateClick = (playListId) => {
    let newName = newNameRef.current.value;
    let uris = editListTracks.map(track => { return track.uri; });
    updatePlayList(playListId, newName, uris);
  }

  if (editBoxIsOpen === true) {
      return (
        <div className="Editlist">
          <div className="remove-space">
            <div className="Show-playlist-list" onClick={handleEditListClick}>
              Edit playlists</div>
          </div>
          <input id="edit-title" placeholder={editListPlayLists[playListPosition].name} ref={newNameRef}></input>
          <button className="Editlist-save" onClick={() => handleUpdateClick(editListPlayLists[playListPosition].id)}>
          <b>UPDATE ON SPOTIFY</b></button>
          <div className="Track-counter">Number of tracks: {editListTracks.length}</div>
          <EditBoxTracks />
          {/* <Pagination /> */}
        </div>
      );
  }

  return null;
}

export default EditBox;
