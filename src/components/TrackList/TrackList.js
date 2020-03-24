import React from 'react';
import useTrack from '../../hooks/useTrack';

import './TrackList.css';

export const TrackList = (props) => {
  const { removeTrack, playListTracks } = useTrack();
  // const { remove } = props;

  // const removeTrack = (e) => {
  //   e.preventDefault();
  //   remove(e.target.getAttribute('data-uri'));
  // }

  // const removeTrack = (uri, list) => {
  //   let trackArray;

  //   if (list === 'editListTracks') {
  //     trackArray = [...this.state.editListTracks]
  //   } else {
  //     trackArray = [...this.state.playListTracks];
  //   }

  //   let removeThis = trackArray.find(savedTrack => {
  //     if (savedTrack.uri === uri) {
  //       return savedTrack;
  //     } else {
  //       return null;
  //     }
  //   });

  //   function remove(array, element) {
  //     const index = array.indexOf(element);

  //     if (index !== -1) {
  //       array.splice(index, 1);
  //     }
  //   }

  //   remove(trackArray, removeThis);

  //   if (list === 'editListTracks') {
  //     this.setState({ editListTracks: trackArray });
  //   } else {
  //     this.setState({ playListTracks: trackArray });
  //   }
  // }

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
