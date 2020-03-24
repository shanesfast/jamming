import React, { useContext } from 'react';
import { GlobalContext } from '../../context/GlobalState';

import './TrackList.css';

export const TrackList = (props) => {
  const [state, setState] = useContext(GlobalContext);
  const { playListTracks } = state;
  console.log(playListTracks);
  const { remove } = props;

  const removeTrack = (e) => {
    e.preventDefault();
    remove(e.target.getAttribute('data-uri'));
  }

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
