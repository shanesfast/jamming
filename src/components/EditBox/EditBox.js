import React from 'react';
import './EditBox.css';
import { EditBoxTracks } from '../EditBoxTracks/EditBoxTracks.js';

export const EditBox = (props) => {

  const handleEditListClick = (e) => {
    e.preventDefault();
    props.onClick.open(e);
  }

  const handleUpdateClick = (e) => {
    e.preventDefault();
    let new_name = document.getElementById('edit-title').value;
    let uris = props.tracks.map(track => { return track.uri; });

    props.onClick.updatePlayList(e.target.getAttribute('data-playlist-id'), new_name, uris);
  }

  if (props.show === 'open') {
    return (
      <div className="Editlist">
        <div className="remove-space">
          <div className="Show-playlist-list" onClick={handleEditListClick}>
            Edit playlists</div>
        </div>
        <input id='edit-title' placeholder={props.editListPlayLists[props.position].name}></input>
        <a className="Editlist-save" onClick={handleUpdateClick}
           data-playlist-id={props.editListPlayLists[props.position].id}>
        <b data-playlist-id={props.editListPlayLists[props.position].id}>UPDATE ON SPOTIFY</b></a>
        <EditBoxTracks
          tracks={props.tracks}
          remove={props.remove} />
      </div>
    );
  } else {
    return null;
  }
}
