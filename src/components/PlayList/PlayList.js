import React, { useContext, useRef } from 'react';
import { PlayListContext } from '../../context/PlayListContext';
import usePlaylist from '../../hooks/usePlaylist';
import useSpotify from '../../hooks/useSpotify';
import './PlayList.css';

export const PlayList = (props) => {
  const titleRef = useRef();

  const { state: playListState } = useContext(PlayListContext);
  const { playListTracks } = playListState; 

  const { removeTrack } = usePlaylist();
  const { openPlayLists, savePlayList } = useSpotify();

  const handleTitleChange = () => {
    let title = titleRef.current.value;

    if (title.length > 0) {
      savePlayList(title);
      titleRef.current.value = '';
    } else if (title.length < 1) {
      alert('You must enter a title before saving the playlist.');
    }
  }

  const renderPlayListTracks = () => {
    if (playListTracks.length > 0) {
      playListTracks.map((track, index) => {
        return (
          <div key={`${track.uri}:${index}`} className="Track">
            <div className="Track-information" id="track">
              <h3>{track.name}</h3>
              <p>{track.artistName} | {track.albumName}</p>
            </div>
            <button className="Track-action" onClick={() => removeTrack(index)}>-</button>
          </div>
        );
      })
    } else {
      return (
      <><br /><p className="empty-playlist-message">Add some tracks.</p></>
      );
    }
       
  }

  return (
    <div className="Playlist">
      <input id='title' placeholder="New Playlist Title" ref={titleRef}></input>
      <button className="Playlist-save" onClick={handleTitleChange}>
      <b>SAVE TO SPOTIFY</b></button>
      <button className="Show-playlist-list" onClick={openPlayLists}>EDIT PLAYLISTS</button>
      <div className="TrackList">
      { renderPlayListTracks() }
      </div>
    </div>
  );
}

export default PlayList;