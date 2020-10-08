import React, { useContext } from 'react';
import useTrack from '../../hooks/useTrack';
import { PositionContext } from '../../context/PositionContext';

import './EditList.css';

export const EditList = (props) => {
  const { dispatch } = useContext(PositionContext);
  const { editListPlayLists, getTracksFromPlayList } = useTrack();

  const handleClick = (e, playlistId, newplayListPosition) => {
    e.preventDefault();
    getTracksFromPlayList(playlistId);
    dispatch({ type: 'UPDATE_POSITION', position: newplayListPosition });
  }

  return (
    editListPlayLists.map(playlist => 
      <div className="List-item" key={playlist.id}>
        <p><i className="Title">{playlist.name}</i> <br />
        <i className="Count">{playlist.count} Tracks</i></p>
        <p><i className="Edit-btn" onClick={(e) => handleClick(e, playlist.id, playlist.position)}
           >edit</i> | <i className="Delete-btn">delete</i></p>
      </div>
    )
  );
}
