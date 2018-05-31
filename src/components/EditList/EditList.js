import React from 'react';
import './EditList.css';

export const EditList = (props) => {

  const handleClick = (e) => {
    e.preventDefault();
    let playlist_id = e.target.getAttribute('id');
    let position = e.target.getAttribute('position');
    props.getTracks(playlist_id);
    props.getPosition(position);
  }

  return (
    <div className="List-item">
      <p><i className="Title">{props.name}</i> <br />
      <i className="Count">{props.count} Tracks</i></p>
      <p><i className="Edit-btn"
            onClick={handleClick}
            position={props.position}
            id={props.id}>edit</i> | <i className="Delete-btn">delete</i></p>
    </div>
  );
}
