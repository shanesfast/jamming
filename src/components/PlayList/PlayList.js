import React, { useRef } from 'react';
import DialogBox from '../../borrowed/custom_dialog_box/dialog-box.1.0.1';
import usePlaylist from '../../hooks/usePlaylist';
import useSpotify from '../../hooks/useSpotify';
import './PlayList.css';

export const PlayList = (props) => {
  const titleRef = useRef();
  const newNameRef = useRef();

  const { closeEditBox, editBoxIsOpen, editListPlayLists, editListTracks, playListPosition, playListTracks, removeTrack, updateEditPlaylistTracks, updateUserPlayLists } = usePlaylist();
  const { getTracksFromPlayList, getUserPlaylists, openPlayLists, savePlayList, updatePlayList } = useSpotify();

  const handleBackToNewPlaylist = () => {
    const confirmBox = new DialogBox({
      trueButtonText: "Yes",
      falseButtonText: "No",
      cancelButtonText: 'Cancel',
      messageText: "Would you like to save the changes made to this playlist before moving on?",
      titleText: "Save Changes"
    });

    confirmBox.respond().then(res => {
      if (res) handleUpdatePlayListClick(editListPlayLists[playListPosition].id, newNameRef.current.value);
      newNameRef.current.value = '';
      closeEditBox();
    });
  }

  const handleSavePlayList = async () => {
    let title = titleRef.current.value;

    if (title.length > 0) {
      const playListId = await savePlayList(title);
      const playlists = await getUserPlaylists();
      const tracks = await getTracksFromPlayList(playListId);    
      titleRef.current.value = '';
      console.log(playlists);
      updateUserPlayLists(playlists);
      updateEditPlaylistTracks(tracks);
    } else if (title.length < 1) {
      alert('You must enter a title before saving the playlist.');
    }
  }

  const handleEditPlayListsClick = (e) => {
    e.preventDefault();
    if (titleRef.current) titleRef.current.value = '';
    openPlayLists(e);
  }

  const handleUpdatePlayListClick = (playListId, updateName) => {
    let newName = updateName ? updateName : editListPlayLists[playListPosition].name;
    let uris = editListTracks.map(track => { return track.uri; });
    updatePlayList(playListId, newName, uris);
    newNameRef.current.value = newName;
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
        <div class="playlist-btn-container">
          <button class="playlist-button" onClick={handleBackToNewPlaylist}>NEW PLAYLIST</button>
          <button className="playlist-save-button" onClick={() => handleUpdatePlayListClick(editListPlayLists[playListPosition].id, newNameRef.current.value)}>
            UPDATE ON SPOTIFY</button>
          <button className="playlist-button" onClick={handleEditPlayListsClick}>EDIT PLAYLISTS</button>
        </div>
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
        <div class="playlist-btn-container">
          <button className="playlist-save-button" onClick={handleSavePlayList}>SAVE TO SPOTIFY</button>
          <button className="playlist-button" onClick={handleEditPlayListsClick}>EDIT PLAYLISTS</button>
        </div>
        <div className="TrackList">
          { renderPlayListTracks() }
        </div>
      </div>
    );
  }
}

export default PlayList;