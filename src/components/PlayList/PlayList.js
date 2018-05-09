import React, { Component } from 'react';
import { TrackList } from '../TrackList/TrackList.js';

export class PlayList extends React.Component {
  constructor(props) {
    super(props);
    this.handleTitleChange = this.handleTitleChange.bind(this);
  }

  handleTitleChange() {
    let title = document.getElementById('title').value;
    let tracks = [];

    if (title.length > 0 && tracks.length > 0) {
      this.props.onClick.savePlayList(title, tracks);
      document.getElementById('title').value = '';
    } else if (title.length < 1) {
      alert('You must enter a title before saving the playlist.');
    } else if (tracks.length < 1) {
      this.props.onClick.savePlayList(title);
      document.getElementById('title').value = '';
    }
  }

  render() {
    return (
      <div className="Playlist">
        <input id='title' placeholder="New Playlist"></input>
        <a className="Playlist-save"
        onClick={this.handleTitleChange}>
        SAVE TO SPOTIFY</a>
        <TrackList
        artist={this.props.artist}
        album={this.props.album}
        track={this.props.track}
        playListTracks={this.props.playListTracks}
        remove={this.props.remove} />
      </div>
    );
  }
}
