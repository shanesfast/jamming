import React from 'react';
import usePlaylist from '../../hooks/usePlaylist';
import useSpotify from '../../hooks/useSpotify';

import './ListOfPlayLists.css';

export const ListOfPlayLists = (props) => {
  const { editListIsOpen, editListPlayLists, populateUserPlayLists, updateEditPlaylistPosition, updateEditPlaylistTracks } = usePlaylist();
  const { deletePlayList, openPlayLists, getTracksFromPlayList } = useSpotify();

  const handleOpenClick = async (e, playListId, newplayListPosition) => {
    e.preventDefault();
    updateEditPlaylistPosition(newplayListPosition);
    const tracks = await getTracksFromPlayList(playListId);    
    updateEditPlaylistTracks(tracks);
  }

  const handleDeleteClick = (e, playListId, playListIndex) => {
    e.preventDefault();
    if (window.confirm("Are you sure you want to remove this playlist from your Spotify account?")) {
      deletePlayList(playListId);
      const newEditListPlayLists = editListPlayLists.filter((playlist, index) => { return index !== playListIndex });
      populateUserPlayLists(newEditListPlayLists);
    }
  }

  if (editListIsOpen === true && Array.isArray(editListPlayLists)) {
    return (
      <div>
        <div className="Close-playlist-container" onClick={openPlayLists}>
        </div>
        <div className="Playlist-container">
          {
            editListPlayLists.map((playlist, index) => 
              <div className="List-item" key={playlist.id}>
                <p><i className="Title">{playlist.name}</i> <br />
                <i className="Count">{playlist.count} Tracks</i></p>
                <p><i className="Edit-btn" onClick={(e) => handleOpenClick(e, playlist.id, playlist.position)}
                    >edit</i> | <i className="Delete-btn" onClick={(e) => handleDeleteClick(e, playlist.id, index)} >delete</i></p>
              </div>
            )
          }
        </div>
      </div>
    );
  } else if (editListIsOpen === true) {
    return (
      <div>
        <div className="Close-playlist-container" onClick={openPlayLists}>
        </div>
        <div className="Playlist-container">
          <p>No playlists found.</p>
        </div>
      </div>
    );
  } else {
    return( <div className="nothing"></div> );
  }
}
