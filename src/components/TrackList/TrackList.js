import React, { Component } from 'react';
import './TrackList.css';

export class TrackList extends React.Component {
  constructor(props) {
    super(props);
    this.removeTrack = this.removeTrack.bind(this);
  }

  removeTrack(e) {
    e.preventDefault();
    this.props.remove(e.target.getAttribute('data-uri'));
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps !== this.props) {
      return true;
    } else {
      return false;
    }
  }

  render() {

      if (this.props.playListTracks.length > 0) {
          return (
            <div className="TrackList">
              {
                this.props.playListTracks.map(track => {
                  return (
                    <div key={track.uri} className="Track">
                      <div className="Track-information" id="track">
                        <h3>{track.name}</h3>
                        <p>{track.artistName} | {track.albumName}</p>
                      </div>
                      <a className="Track-action"
                      data-uri={track.uri}
                      onClick={this.removeTrack}>-</a>
                    </div>
                  );
                })
              }
            </div>
          );
      } else {
        return (
          <div className="TrackList">
            <br /><p>Add some tracks!</p>
          </div>
        );
      }
  }


}
