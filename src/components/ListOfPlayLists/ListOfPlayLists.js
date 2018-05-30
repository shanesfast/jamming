import React from 'react';
import './ListOfPlayLists.css';
import { EditList } from '../EditList/EditList.js';

export const ListOfPlayLists = (props) => {

  const handleClick = (e) => {
    e.preventDefault();
    props.toggle(e);
  }

  const generateRandomString = (length) => {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  };

  if (props.show === 'open' && Array.isArray(props.playlists)) {
    return (
      <div>
        <div className="Close-playlist-container" onClick={handleClick}>
        </div>
        <div className="Playlist-container">
          <h3>{props.playlists[0].user} Playlists</h3>
          <div className="Playlist-list">
            {
              props.playlists.map(playlist => {
                return <EditList
                name={playlist.name}
                id={playlist.id}
                count={playlist.count}
                key={generateRandomString(16)}
                getTracks={props.getTracks} />
              })
            }
          </div>
        </div>
      </div>
    );
  } else if (props.show === 'open') {
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
