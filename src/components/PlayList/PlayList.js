import React from 'react';
import { TrackList } from '../TrackList/TrackList.js';
import './PlayList.css';

export const PlayList = (props) => {

  const handleTitleChange = () => {
    let title = document.getElementById('title').value;
    let tracks = [];

    if (title.length > 0 && tracks.length > 0) {
      props.onClick.savePlayList(title, tracks);
      document.getElementById('title').value = '';
    } else if (title.length < 1) {
      alert('You must enter a title before saving the playlist.');
    } else if (tracks.length < 1) {
      props.onClick.savePlayList(title);
      document.getElementById('title').value = '';
    }
  }

  const handleClick = (e) => {
    e.preventDefault();
    props.onClick.open(e);
  }

  return (
    <div className="Playlist">
      <div className="remove-space">
        <div className="Show-playlist-list" onClick={handleClick}>Edit playlists</div>
      </div>
      <input id='title' placeholder="New Playlist"></input>
      <a className="Playlist-save" onClick={handleTitleChange}>
      <b>SAVE TO SPOTIFY</b></a>
      <TrackList
        artist={props.artist}
        album={props.album}
        track={props.track}
        playListTracks={props.playListTracks}
        remove={props.remove} />
    </div>
  );
}
