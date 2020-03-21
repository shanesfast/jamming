import React from 'react';
import { TrackList } from '../TrackList/TrackList.js';
import './PlayList.css';

class PlayList extends React.Component {
  constructor(props) {
    super(props);
    this.titleRef = React.createRef();  
  }

  handleTitleChange = () => {
    let title = this.titleRef.current.value;

    if (title.length > 0) {
      this.props.onClick.savePlayList(title);
      this.titleRef.current.value = '';
    } else if (title.length < 1) {
      alert('You must enter a title before saving the playlist.');
    }
  }

  handleClick = (e) => {
    e.preventDefault();
    this.props.onClick.open(e);
  }

  render() {
    const { artist, album, track, playListTracks, remove } = this.props;

    return (
      <div className="Playlist">
        <div className="remove-space">
          <div className="Show-playlist-list" onClick={this.handleClick}>Edit playlists</div>
        </div>
        <input id='title' placeholder="New Playlist" ref={this.titleRef}></input>
        <a className="Playlist-save" onClick={this.handleTitleChange}>
        <b>SAVE TO SPOTIFY</b></a>
        <TrackList
          artist={artist}
          album={album}
          track={track}
          playListTracks={playListTracks}
          remove={remove} />
      </div>
    );
  }
}

export default PlayList;