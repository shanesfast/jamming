import React from 'react';
import useTrack from '../../hooks/useTrack';

import './EditList.css';

export const EditList = (props) => {
  const { editListPlayLists, getPosition, getTracksFromPlayList } = useTrack();

  const handleClick = (e) => {
    e.preventDefault();
    let playlist_id = e.target.getAttribute('key');
    let position = e.target.getAttribute('position');
    getTracksFromPlayList(playlist_id);
    getPosition(position);
  }

  return (
    editListPlayLists.map(playlist => 
      <div className="List-item">
        <p><i className="Title">{playlist.name}</i> <br />
        <i className="Count">{playlist.count} Tracks</i></p>
        <p><i className="Edit-btn"
              onClick={handleClick}
              position={playlist.position}
              key={playlist.id}>edit</i> | <i className="Delete-btn">delete</i></p>
      </div>
    )
  );
}
