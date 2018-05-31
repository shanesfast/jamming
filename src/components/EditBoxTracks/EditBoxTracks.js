import React from 'react';
import './EditBoxTracks.css';

export const EditBoxTracks = (props) => {

  const removeTrack = (e) => {
    e.preventDefault();
    props.remove(e.target.getAttribute('data-uri'), 'editListTracks');
  }

  if (Array.isArray(props.tracks) && props.tracks.length > 0) {
      return (
        <div className="TrackList">
          {
            props.tracks.map(track => {
              return (
                <div key={track.uri} className="Track">
                  <div className="Track-information" id="track">
                    <h3>{track.name}</h3>
                    <p>{track.artistName} | {track.albumName}</p>
                  </div>
                  <a className="Track-action"
                    data-uri={track.uri}
                    onClick={removeTrack}>-</a>
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