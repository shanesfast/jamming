import React, { useRef } from 'react';
import usePlaylist from '../../hooks/usePlaylist';
import useSpotify from '../../hooks/useSpotify';
import './PlayList.css';

export const PlayList = (props) => {
  const titleRef = useRef();
  const newNameRef = useRef();

  const { editBoxIsOpen, editListPlayLists, editListTracks, playListPosition, playListTracks, removeTrack } = usePlaylist();
  const { openPlayLists, savePlayList, updatePlayList } = useSpotify();

  const handleTitleChange = () => {
    let title = titleRef.current.value;

    if (title.length > 0) {
      savePlayList(title);
      titleRef.current.value = '';
    } else if (title.length < 1) {
      alert('You must enter a title before saving the playlist.');
    }
  }

  const handleEditPlayListsClick = (e) => {
    e.preventDefault();
    openPlayLists(e);
  }

  const handleUpdatePlayListClick = (playListId) => {
    let newName = newNameRef.current.value;
    let uris = editListTracks.map(track => { return track.uri; });
    updatePlayList(playListId, newName, uris);
  }

  const renderEditTracks = () => {
    if (Array.isArray(editListTracks) && editListTracks.length > 0) {
      return (
        <>
          {
            editListTracks.map((track, index) => {
              return (
                <div key={`${track.uri}:${index}`} className="Track">
                  <div className="Track-information" id="track">
                    <h3>{track.name}</h3>
                    <p>{track.artistName} | {track.albumName}</p>
                  </div>
                  <button className="Track-action"
                    onClick={() => removeTrack(index, true)}>-</button>
                </div>
              );
            })
          }
        </>
      );
    } else {
      return(<><br /><p>Add some tracks!</p></>);
    }
  }

  const renderPlayListTracks = () => {
    if (playListTracks.length > 0) {
      return(
        <>
          {
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
          }
        </>
      );
    } else {
      return (
      <><br /><p className="empty-playlist-message">Add some tracks.</p></>
      );
    }   
  }

  if (editBoxIsOpen) {
    return(
      <div className="Playlist">
        <input id="title" placeholder={editListPlayLists[playListPosition].name} ref={newNameRef}></input>
        <button className="Playlist-save" onClick={() => handleUpdatePlayListClick(editListPlayLists[playListPosition].id)}>
        <b>UPDATE ON SPOTIFY</b></button>
        <button className="Show-playlist-list" onClick={handleEditPlayListsClick}>EDIT PLAYLISTS</button>
        <div className="Track-counter">Number of tracks: {editListTracks.length}</div>
        <div className="TrackList">
          { renderEditTracks() }
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
          { renderPlayListTracks() }
        </div>
      </div>
    );
  }
}

export default PlayList;