import React from 'react';
import usePlaylist from '../../hooks/usePlaylist';
// import usePagination from '../../hooks/usePagination';

import './EditBoxTracks.css';

const EditBoxTracks = (props) => {
  const { removeTrack, editListTracks } = usePlaylist();
  // const { pageOfItems } = usePagination();

  if (Array.isArray(editListTracks) && editListTracks.length > 0) {
    return (
      <div className="TrackList">
        {
          editListTracks.map((track, index) => {
            return (
              <div key={`${track.uri}:${index}`} className="Track">
                <div className="Track-information" id="track">
                  <h3>{track.name}</h3>
                  <p>{track.artistName} | {track.albumName}</p>
                </div>
                <button className="Track-action"
                  onClick={() => removeTrack(index, true)}>-</button>
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

export default EditBoxTracks;
