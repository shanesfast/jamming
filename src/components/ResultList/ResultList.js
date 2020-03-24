import React from 'react';
import useTrack from '../../hooks/useTrack';

import './ResultList.css';

export const ResultList = (props) => {
  const { addTrack } = useTrack();
  
  const { trackInfo, sortBy, 
          img, name, artistId, albumName, artistName, albumId } = props;

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
          <button className="Track-action"
            data-id={albumId}
            data-album={albumName}
            onClick={addAlbum}>+</button>
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
        <button className="Track-action" onClick={() => addTrack(trackInfo)}>+</button>
      </div>
    );
  }
}
