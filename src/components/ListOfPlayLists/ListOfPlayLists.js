import React from 'react';
import useTrack from '../../hooks/useTrack';
import { EditList } from '../EditList/EditList.js';

import './ListOfPlayLists.css';

export const ListOfPlayLists = (props) => {
  const { editListIsOpen, editListPlayLists, openPlayLists } = useTrack();

  if (editListIsOpen === true && Array.isArray(editListPlayLists)) {
    return (
      <div>
        <div className="Close-playlist-container" onClick={openPlayLists}>
        </div>
        <div className="Playlist-container">
          <h3>{editListPlayLists[0].user} Playlists</h3>
          <div className="Playlist-list">
            <EditList />
          </div>
        </div>
      </div>
    );
  } else if (editListIsOpen === true) {
    return (
      <div>
        <div className="Close-playlist-container" onClick={openPlayLists}>
        </div>
        <div className="Playlist-container">
          <h3>Playlists</h3>
          <div className="Playlist-list">
            <p>No playlists found.</p>
          </div>
        </div>
      </div>
    );
  } else {
    return( <div className="nothing"></div> );
  }
}
