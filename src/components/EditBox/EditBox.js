import React from 'react';
import './EditBox.css';
import { EditBoxTracks } from '../EditBoxTracks/EditBoxTracks.js';
import Pagination from '../Pagination/Pagination.js';

class EditBox extends React.Component {
  constructor(props) {
    super(props);
    this.newNameRef = React.createRef();  
  }

  handleEditListClick = (e) => {
    e.preventDefault();
    this.this.props.onClick.open(e);
  }

  handleUpdateClick = (e) => {
    e.preventDefault();
    let new_name = this.newNameRef.current.value;
    let uris = this.props.tracks.map(track => { return track.uri; });

    this.props.onClick.updatePlayList(e.target.getAttribute('data-playlist-id'), new_name, uris);
  }

  onChangePage = (pageOfItems) => {
    this.props.pagination.onChangePage(pageOfItems);
  }

  render() {
    const {show, editListPlayLists, tracks, remove, pagination, position} = this.props;

    if (show === 'open') {
      return (
        <div className="Editlist">
          <div className="remove-space">
            <div className="Show-playlist-list" onClick={this.handleEditListClick}>
              Edit playlists</div>
          </div>
          <input id="edit-title" placeholder={editListPlayLists[position].name} ref={this.newNameRef}></input>
          <a className="Editlist-save" onClick={this.handleUpdateClick}
            data-playlist-id={editListPlayLists[position].id}>
          <b data-playlist-id={editListPlayLists[position].id}>UPDATE ON SPOTIFY</b></a>
          <div className="Track-counter">Number of tracks: {tracks.length}</div>
          <EditBoxTracks
            tracks={tracks}
            remove={remove}
            pagination={pagination} />
          <Pagination items={tracks} onChangePage={this.onChangePage} />
        </div>
      );
    } else {
      return null;
    }
  }
}

export default EditBox;
