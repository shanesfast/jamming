import React, { Component } from 'react';
import { TrackList } from '../TrackList/TrackList.js';

export class PlayList extends React.Component {
  render() {
    return (
      <div className="Playlist">
        <input placeholder="New Playlist"></input>
        <TrackList />
        <a className="Playlist-save">SAVE TO SPOTIFY</a>
      </div>
    );
  }
}
