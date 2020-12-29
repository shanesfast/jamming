import React, { useRef } from 'react';
import DialogBox from '../../borrowed/custom_dialog_box/dialog-box.1.0.1';
import usePlaylist from '../../hooks/usePlaylist';
import useSpotify from '../../hooks/useSpotify';
import './PlayList.css';

export const PlayList = (props) => {
  const titleRef = useRef();
  const newNameRef = useRef();

  const { closeEditBox, editBoxIsOpen, editListPlayLists, editListTracks, playListPosition, playListTracks, removeTrack } = usePlaylist();
  const { openPlayLists, savePlayList, updatePlayList } = useSpotify();

  const handleBackToNewPlaylist = () => {
    const confirmBox = new DialogBox({
      trueButtonText: "Yes",
      falseButtonText: "No",
      cancelButtonText: 'Cancel',
      messageText: "Would you like to save the changes made to this playlist before moving on?",
      titleText: "Save Changes"
    });

    confirmBox.respond().then(res => {
      if (res) handleUpdatePlayListClick(editListPlayLists[playListPosition].id);
      newNameRef.current.value = '';
      closeEditBox();
    });
  }

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
    if (titleRef.current) titleRef.current.value = '';
    openPlayLists(e);
  }

  const handleUpdatePlayListClick = (playListId, updateName=false) => {
    let newName = updateName ? newNameRef.current.value : editListPlayLists[playListPosition].name;
    let uris = editListTracks.map(track => { return track.uri; });
    updatePlayList(playListId, newName, uris);
    newNameRef.current.value = editListPlayLists[playListPosition].name;
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
                    onClick={() => removeTrack(index)}>-</button>
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
        <button id="back-to-new-playlist" onClick={handleBackToNewPlaylist}>Back to new playlist</button>
        <button className="Playlist-save" onClick={() => handleUpdatePlayListClick(editListPlayLists[playListPosition].id, true)}>
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
        <button className="Show-playlist-list" onClick={handleEditPlayListsClick}>EDIT PLAYLISTS</button>
        <div className="TrackList">
          { renderPlayListTracks() }
        </div>
      </div>
    );
  }
}

export default PlayList;