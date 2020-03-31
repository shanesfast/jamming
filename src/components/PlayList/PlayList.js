import React, { useContext, useRef } from 'react';
import { PlayListContext } from '../../context/PlayListContext';
import useTrack from '../../hooks/useTrack';
import { TrackList } from '../TrackList/TrackList.js';
import './PlayList.css';

export const PlayList = (props) => {
  const titleRef = useRef();
  const [state] = useContext(PlayListContext);
  const { artist, album, track, playListTracks } = state; 

  const { openPlayLists } = useTrack();

  const handleTitleChange = () => {
    let title = titleRef.current.value;

    if (title.length > 0) {
      props.onClick.savePlayList(title);
      titleRef.current.value = '';
    } else if (title.length < 1) {
      alert('You must enter a title before saving the playlist.');
    }
  }

  return (
    <div className="Playlist">
      <div className="remove-space">
        <div className="Show-playlist-list" onClick={openPlayLists}>Edit playlists</div>
      </div>
      <input id='title' placeholder="New Playlist" ref={titleRef}></input>
      <button className="Playlist-save" onClick={handleTitleChange}>
      <b>SAVE TO SPOTIFY</b></button>
      <TrackList
        artist={artist}
        album={album}
        track={track}
        playListTracks={playListTracks}
      />
    </div>
  );
}

export default PlayList;