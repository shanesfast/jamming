import React from 'react';
import './ResultList.css';

export const ResultList = (props) => {

  const addTrack = () => {
    props.onAdd(props.trackInfo);
  }

  const addAlbum = (e) => {
    props.addAlbum(
      e.target.getAttribute('data-id'),
      e.target.getAttribute('data-album')
    );
  }

  const getAlbums = (e) => {
    props.getAlbums(
      e.target.getAttribute('data-artist-id'),
      e.target.getAttribute('data-artist-name')
    );
  }

  if (props.sortBy === "Artist") {
    return (
      <div className="Track">
        <div className="Track-information">
          <img src={props.img.url}
            alt={props.name}
            data-artist-id={props.artistId}
            data-artist-name={props.name}
            onClick={getAlbums}></img>
          <h1 data-artist-id={props.artistId}
            data-artist-name={props.name}
            onClick={getAlbums}>{ props.name }</h1>
        </div>
      </div>
    );
  } else if (props.sortBy === "Album") {
    return (
      <div>
        <div className="Track">
          <div className="Track-information" id="album">
            <img src={props.img.url} alt={props.name} id="album"></img>
            <h3>{props.albumName}</h3>
            <p>{ props.artistName }</p>
          </div>
          <a className="Track-action"
            data-id={props.albumId}
            data-album={props.albumName}
            onClick={addAlbum}>+</a>
        </div>
      </div>
    );
  } else {
    return (
      <div className="Track">
        <div className="Track-information" id="track">
          <h3>{ props.name }</h3>
          <p>{ props.artistName } | { props.albumName }</p>
        </div>
        <a className="Track-action" onClick={addTrack}>+</a>
      </div>
    );
  }
}
