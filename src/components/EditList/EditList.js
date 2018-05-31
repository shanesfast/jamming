import React from 'react';
import './EditList.css';

export const EditList = (props) => {

  const handleClick = (e) => {
    let playlist_id = e.target.getAttribute('id');
    props.getTracks(playlist_id);
  }

  return (
    <div className="List-item">
      <p><i className="Title">{props.name}</i> <br />
      <i className="Count">{props.count} Tracks</i></p>
      <p><i className="Edit-btn"
            onClick={handleClick}
            id={props.id}>edit</i> | <i className="Delete-btn">delete</i></p>
    </div>
  );
}
