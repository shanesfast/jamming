import React, { useContext } from 'react';
import useTrack from '../../hooks/useTrack';
import useSpotifyApiCalls from '../../hooks/useSpotifyApiCalls';
import { SearchContext } from '../../context/SearchContext';

import './ResultList.css';

export const ResultList = (props) => {
  const { addTrack } = useTrack();
  const { dispatch } = useContext(SearchContext);

  const { getAlbumsFromArtist, getTracksFromAlbum } = useSpotifyApiCalls();
  
  const { trackInfo, sortBy, img, name,
          artistId, albumName, artistName, albumId } = props;

  const addAlbum = (id, name) => {
    getTracksFromAlbum(id, name);
  }

  const getAlbums = (id, name) => {
    dispatch({ type: 'UPDATE_SORT_BY', option: "Album" });
    dispatch({ type: 'UPDATE_SEARCH_TERMS', search: '' }); // This prevents the Search Reducer from overriding
    getAlbumsFromArtist(id, name);                         // the reslults of the following API call to get albums for one Artist
  }

  if (sortBy === "Artist") {
    return (
      <div className="Track">
        <div className="Track-information" onClick={() => getAlbums(artistId, name)}>
          <img src={img.url} alt={name}></img>
          <h1>{name}</h1>
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
          <button className="Track-action" onClick={() => addAlbum(albumId, albumName)}>+</button>
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
