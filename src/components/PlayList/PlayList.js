import React, { useContext, useRef } from 'react';
import { PlayListContext } from '../../context/PlayListContext';
import useTrack from '../../hooks/useTrack';
import './PlayList.css';

export const PlayList = (props) => {
  const titleRef = useRef();
  const { state } = useContext(PlayListContext);
  const { playListTracks } = state; 

  const { openPlayLists, removeTrack } = useTrack();

  const handleTitleChange = () => {
    let title = titleRef.current.value;

    if (title.length > 0) {
      props.onClick.savePlayList(title);
      titleRef.current.value = '';
    } else if (title.length < 1) {
      alert('You must enter a title before saving the playlist.');
    }
  }
  console.log(playListTracks);
  if (playListTracks.length > 0) {
    return (
      <div className="Playlist">
        <div className="remove-space">
          <div className="Show-playlist-list" onClick={openPlayLists}>Edit playlists</div>
        </div>
        <input id='title' placeholder="New Playlist" ref={titleRef}></input>
        <button className="Playlist-save" onClick={handleTitleChange}>
        <b>SAVE TO SPOTIFY</b></button>
        <div className="TrackList">
        {
          playListTracks.map(track => {
            console.log(track.uri);
            return (
              <div key={track.uri} className="Track">
                <div className="Track-information" id="track">
                  <h3>{track.name}</h3>
                  <p>{track.artistName} | {track.albumName}</p>
                </div>
                <button className="Track-action" onClick={() => removeTrack(track.uri)}>-</button>
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
        <div className="remove-space">
          <div className="Show-playlist-list" onClick={openPlayLists}>Edit playlists</div>
        </div>
        <input id='title' placeholder="New Playlist" ref={titleRef}></input>
        <button className="Playlist-save" onClick={handleTitleChange}>
        <b>SAVE TO SPOTIFY</b></button>
        <div className="TrackList">
          <br /><p>Add some tracks!</p>
        </div>
      </div>
    );
  }
}

export default PlayList;