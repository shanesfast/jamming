import React from 'react';
import './EditList.css';

export const EditList = (props) => {
    return (
      <div className="List-item">
        <p><i className="Title">{props.name}</i> <br /> <i className="Count">{props.count} Tracks</i></p>
        <p><i className="Edit-btn">edit</i> | <i className="Delete-btn">delete</i></p>
      </div>
    );
}
