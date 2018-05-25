import React from 'react';
import './ListOfPlayLists.css';
import { EditList } from '../EditList/EditList.js';

export class ListOfPlayLists extends React.Component {

  handleClick = (e) => {
    e.preventDefault();
    this.props.toggle(e);
  }

  generateRandomString(length) {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  };

  render() {
    if (this.props.show === 'open' && Array.isArray(this.props.playlists)) {
      return (
        <div>
          <div className="Close-playlist-container" onClick={this.handleClick}>
          </div>
          <div className="Playlist-container">
            <h3>{this.props.playlists[0].user} Playlists</h3>
            <div className="Playlist-list">
              {
                this.props.playlists.map(playlist => {
                  return <EditList
                  name={playlist.name}
                  id={playlist.id}
                  count={playlist.count}
                  key={this.generateRandomString(16)} />
                })
              }
            </div>
          </div>
        </div>
      );
    } else if (this.props.show === 'open') {
      return (
        <div>
          <div className="Close-playlist-container" onClick={this.handleClick}>
          </div>
          <div className="Playlist-container">
            <h3>UserIDs Playlists</h3>
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
}
