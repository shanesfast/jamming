import React, { Component } from 'react';
import './ListOfPlayLists.css';

export class ListOfPlayLists extends React.Component {

  render() {
    return (
      <div className="Playlist-container">
        <h3>UserIDs Playlists</h3>
        <div className="Playlist-list">
          <div className="List-item">
            <p>This is a Playlist : <i>30 Tracks</i></p>
          </div>
        </div>
      </div>
    )
  }
}
