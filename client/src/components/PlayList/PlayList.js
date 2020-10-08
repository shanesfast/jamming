import React, { useContext, useRef } from 'react';
import { PlayListContext } from '../../context/PlayListContext';
import useTrack from '../../hooks/useTrack';
import './PlayList.css';

export const PlayList = (props) => {
  const titleRef = useRef();
  const { state } = useContext(PlayListContext);
  const { playListTracks } = state; 

  const { openPlayLists, removeTrack, savePlayList } = useTrack();

  const handleTitleChange = () => {
    let title = titleRef.current.value;

    if (title.length > 0) {
      savePlayList(title);
      titleRef.current.value = '';
    } else if (title.length < 1) {
      alert('You must enter a title before saving the playlist.');
    }
  }

  if (playListTracks.length > 0) {
    return (
      <div className="Playlist">
        <input id='title' placeholder="New Playlist Title" ref={titleRef}></input>
        <button className="Playlist-save" onClick={handleTitleChange}>
        <b>SAVE TO SPOTIFY</b></button>
        <button className="Show-playlist-list" onClick={openPlayLists}>EDIT PLAYLISTS</button>
        <div className="TrackList">
        {
          playListTracks.map(track => {
            return (
              <div key={track.uri} className="Track">
                <div className="Track-information" id="track">
                  <h3>{track.name}</h3>
                  <p>{track.artistName} | {track.albumName}</p>
                </div>
                <button className="Track-action" onClick={() => removeTrack(track)}>-</button>
              </div>
            );
          })
        }
        </div>
      </div>
    );
  } else {
    return (
      <div className="Playlist">
        <input id='title' placeholder="New Playlist Title" ref={titleRef}></input>
        <button className="Playlist-save" onClick={handleTitleChange}>
        <b>SAVE TO SPOTIFY</b></button>
        <button className="Show-playlist-list" onClick={openPlayLists}>EDIT PLAYLISTS</button>
        <div className="TrackList">
          <br /><p className="empty-playlist-message">Add some tracks.</p>
        </div>
      </div>
    );
  }
}

export default PlayList;