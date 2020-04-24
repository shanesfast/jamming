import React from 'react';
import useTrack from '../../hooks/useTrack';

import './TrackList.css';

export const TrackList = (props) => {
  const { removeTrack, playListTracks } = useTrack();

  if (playListTracks.length > 0) {
      return (
        <div className="TrackList">
          {
            playListTracks.map(track => {
              return (
                <div key={track.uri} className="Track">
                  <div className="Track-information" id="track">
                    <h3>{track.name}</h3>
                    <p>{track.artistName} | {track.albumName}</p>
                  </div>
                  <button className="Track-action" onClick={() => removeTrack(track.uri)}>-</button>
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
