import React from 'react';
import './EditList.css';

export class EditList extends React.Component {

  handleClick = (e) => {
    let playlist_id = e.target.getAttribute('id');
    this.props.getTracks(playlist_id);
  }

  render() {
    return (
      <div className="List-item">
        <p><i className="Title">{this.props.name}</i> <br />
        <i className="Count">{this.props.count} Tracks</i></p>
        <p><i className="Edit-btn"
            onClick={this.handleClick}
            id={this.props.id}>edit</i> | <i className="Delete-btn">delete</i></p>
      </div>
    );
  }
}
