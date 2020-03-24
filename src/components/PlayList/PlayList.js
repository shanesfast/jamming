import React, { useContext, useRef } from 'react';
import { GlobalContext } from '../../context/GlobalState';
import { TrackList } from '../TrackList/TrackList.js';
import './PlayList.css';

export const PlayList = (props) => {
  const titleRef = useRef();
  const [state] = useContext(GlobalContext);
  const { artist, album, track, playListTracks } = state; 

  const handleTitleChange = () => {
    let title = titleRef.current.value;

    if (title.length > 0) {
      props.onClick.savePlayList(title);
      titleRef.current.value = '';
    } else if (title.length < 1) {
      alert('You must enter a title before saving the playlist.');
    }
  }

  const handleClick = (e) => {
    e.preventDefault();
    props.onClick.open(e);
  }

  const { remove } = props;

  return (
    <div className="Playlist">
      <div className="remove-space">
        <div className="Show-playlist-list" onClick={handleClick}>Edit playlists</div>
      </div>
      <input id='title' placeholder="New Playlist" ref={titleRef}></input>
      <a className="Playlist-save" onClick={handleTitleChange}>
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

export default PlayList;