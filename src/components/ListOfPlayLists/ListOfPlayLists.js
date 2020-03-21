import React from 'react';
import './ListOfPlayLists.css';
import { EditList } from '../EditList/EditList.js';

export const ListOfPlayLists = (props) => {
  const { toggle, show, playlists, getTracks, getPosition } = props;

  const handleClick = (e) => {
    e.preventDefault();
    toggle(e);
  }

  const generateRandomString = (length) => {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  };

  if (show === 'open' && Array.isArray(playlists)) {
    return (
      <div>
        <div className="Close-playlist-container" onClick={handleClick}>
        </div>
        <div className="Playlist-container">
          <h3>{playlists[0].user} Playlists</h3>
          <div className="Playlist-list">
            {
              playlists.map(playlist => {
                return <EditList
                name={playlist.name}
                id={playlist.id}
                count={playlist.count}
                position={playlist.position}
                key={generateRandomString(16)}
                getTracks={getTracks}
                getPosition={getPosition} />
              })
            }
          </div>
        </div>
      </div>
    );
  } else if (show === 'open') {
    return (
      <div>
        <div className="Close-playlist-container" onClick={handleClick}>
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
