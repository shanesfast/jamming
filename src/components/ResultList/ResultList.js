import React, { useContext } from 'react';
import { GlobalContext } from '../../context/GlobalState';

import './ResultList.css';

export const ResultList = (props) => {
  const [state, setState] = useContext(GlobalContext);
  const { editBox, editListTracks, playListTracks } = state;
  
  const { trackInfo, sortBy, 
          img, name, artistId, albumName, artistName, albumId } = props;

  const addTrack = () => {
    if (editBox === 'open') {
      if (editListTracks.find(savedTrack => savedTrack.uri === trackInfo.uri)) {
        return;
      }
      return setState(state => ({...state.editListTracks, trackInfo}));
    }

    if (playListTracks.find(savedTrack => savedTrack.uri === trackInfo.uri)) {
      return;
    }
    return setState(state => ({...state, playListTracks: [...playListTracks, trackInfo] }) );
  }

  const addAlbum = (e) => {
    addAlbum(
      e.target.getAttribute('data-id'),
      e.target.getAttribute('data-album')
    );
  }

  const getAlbums = (e) => {
    getAlbums(
      e.target.getAttribute('data-artist-id'),
      e.target.getAttribute('data-artist-name')
    );
  }

  if (sortBy === "Artist") {
    return (
      <div className="Track">
        <div className="Track-information">
          <img src={img.url}
            alt={name}
            data-artist-id={artistId}
            data-artist-name={name}
            onClick={getAlbums}></img>
          <h1 data-artist-id={artistId}
            data-artist-name={name}
            onClick={getAlbums}>{name}</h1>
        </div>
      </div>
    );
  } else if (sortBy === "Album") {
    return (
      <div>
        <div className="Track">
          <div className="Track-information" id="album">
            <img src={img.url} alt={name} id="album"></img>
            <h3>{albumName}</h3>
            <p>{ artistName }</p>
          </div>
          <a className="Track-action"
            data-id={albumId}
            data-album={albumName}
            onClick={addAlbum}>+</a>
        </div>
      </div>
    );
  } else {
    return (
      <div className="Track">
        <div className="Track-information" id="track">
          <h3>{ name }</h3>
          <p>{ artistName } | { albumName }</p>
        </div>
        <a className="Track-action" onClick={addTrack}>+</a>
      </div>
    );
  }
}
