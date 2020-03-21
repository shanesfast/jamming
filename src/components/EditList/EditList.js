import React from 'react';
import './EditList.css';

export const EditList = (props) => {
  const { getTracks, getPosition, name, count, position, id } = props;

  const handleClick = (e) => {
    e.preventDefault();
    let playlist_id = e.target.getAttribute('id');
    let position = e.target.getAttribute('position');
    getTracks(playlist_id);
    getPosition(position);
  }

  return (
    <div className="List-item">
      <p><i className="Title">{name}</i> <br />
      <i className="Count">{count} Tracks</i></p>
      <p><i className="Edit-btn"
            onClick={handleClick}
            position={position}
            id={id}>edit</i> | <i className="Delete-btn">delete</i></p>
    </div>
  );
}
