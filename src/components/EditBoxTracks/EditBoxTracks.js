import React from 'react';
import useTrack from '../../hooks/useTrack';

import './EditBoxTracks.css';

export const EditBoxTracks = (props) => {
  const { removeTrack, editListTracks, pagination } = useTrack();

  if (Array.isArray(editListTracks) && editListTracks.length > 0) {
    return (
      <div className="TrackList">
        {
          pagination.pageOfItems.map(track => {
            return (
              <div key={track.uri} className="Track">
                <div className="Track-information" id="track">
                  <h3>{track.name}</h3>
                  <p>{track.artistName} | {track.albumName}</p>
                </div>
                <button className="Track-action"
                  data-uri={track.uri}
                  onClick={() => removeTrack(track.uri, true)}>-</button>
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
