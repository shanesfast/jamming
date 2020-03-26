import React, { useEffect } from 'react';
import useTrack from '../../hooks/useTrack';
import { EditList } from '../EditList/EditList.js';

import './ListOfPlayLists.css';

export const ListOfPlayLists = (props) => {
  const { openEditList, editListPlayLists, openPlayLists } = useTrack();

  // const generateRandomString = (length) => {
  //   let text = '';
  //   const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  //   for (let i = 0; i < length; i++) {
  //     text += possible.charAt(Math.floor(Math.random() * possible.length));
  //   }
  //   return text;
  // };

  useEffect(function() {
    console.log('a change has occurred');
  }, [openEditList]);

  if (openEditList === true && Array.isArray(editListPlayLists)) {
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
  } else if (openEditList === true) {
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
