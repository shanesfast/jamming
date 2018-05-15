import React, { Component } from 'react';
import './ListOfPlayLists.css';

export class ListOfPlayLists extends React.Component {

  handleClick = (e) => {
    e.preventDefault();
    this.props.toggle(e);
  }

  render() {
    if (this.props.show === 'open') {
      return (
        <div>
          <div className="Close-playlist-container" onClick={this.handleClick}>
          </div>
          <div className="Playlist-container">
            <h3>UserIDs Playlists</h3>
            <div className="Playlist-list">
              <div className="List-item">
                <p>This is a Playlist : <i>30 Tracks</i></p>
                <p>edit | delete</p>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return( <div className="nothing"></div> );
    }
  }
}
