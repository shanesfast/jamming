import React from 'react';
import usePlaylist from '../../hooks/usePlaylist';
import useSpotify from '../../hooks/useSpotify';

import './ListOfPlayLists.css';

export const ListOfPlayLists = (props) => {
  const { editListIsOpen, editListPlayLists } = usePlaylist();
  const { openPlayLists, getTracksFromPlayList } = useSpotify();

  const handleClick = (e, playlistId, newplayListPosition) => {
    e.preventDefault();
    getTracksFromPlayList(playlistId);
  }

  if (editListIsOpen === true && Array.isArray(editListPlayLists)) {
    return (
      <div>
        <div className="Close-playlist-container" onClick={openPlayLists}>
        </div>
        <div className="Playlist-container">
          <h3>{editListPlayLists[0].user} Playlists</h3>
          <div className="Playlist-list">
            {
              editListPlayLists.map(playlist => 
                <div className="List-item" key={playlist.id}>
                  <p><i className="Title">{playlist.name}</i> <br />
                  <i className="Count">{playlist.count} Tracks</i></p>
                  <p><i className="Edit-btn" onClick={(e) => handleClick(e, playlist.id, playlist.position)}
                     >edit</i> | <i className="Delete-btn">delete</i></p>
                </div>
              )
            }
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
