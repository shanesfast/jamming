import React, { useContext, useEffect } from 'react';
import { SearchContext } from '../../context/SearchContext';
import useSpotify from '../../hooks/useSpotify';
import useTrack from '../../hooks/useTrack';
import './SearchResults.css';


const sortByOptions = ['Artist', 'Album', 'Track'];
let aborts = [];

export const SearchResults = (props) => {
  const { state, dispatch } = useContext(SearchContext);
  const { artist, album, track, searchTerms, sortBy } = state;
  const { artistResult, albumResult, getAlbumsFromArtist, getTracksFromAlbum, trackResult } = useSpotify();
  const { addTrack } = useTrack();

  const renderSortByOptions = () => {
    return sortByOptions.map(sortValue => {
      return <h3 key={ sortValue }
              options={ sortValue }
              className={ setSortByClass(sortValue) }
              onClick={ handleSortBy }>
                { sortValue }
              </h3>
    });
  }

  const setSortByClass = (sortValue) => {
    if (sortBy === sortValue) return "active";

    // When you click on an artist, it brings up that artists albums in the album filter section
    // This ensures that the 'album' filter button is selected after clicking on an artist
    if (sortBy === 'AlbumsByArtist' && sortValue === 'Album') return "active";
  }

  const handleSortBy = (e) => {
    let sortValue = e.target.innerHTML;
    dispatch({ type: 'UPDATE_SORT_BY', option: sortValue });
  }

  const getAlbums = (id, name) => {
    aborts.map(abortThis => abortThis.abort());
    aborts = [];
    let aborter = new AbortController();
    aborts.push(aborter);

    dispatch({ type: 'UPDATE_SORT_BY', option: 'AlbumsByArtist' });
    getAlbumsFromArtist(id, name, aborter.signal);
  }

  const addAlbum = (id, name) => {
    aborts.map(abortThis => abortThis.abort());
    aborts = [];
    let aborter = new AbortController();
    aborts.push(aborter);

    getTracksFromAlbum(id, name, aborter.signal);
  }

  useEffect(() => {
    const updateSearchResults = () => {
      if (sortBy === 'Artist') dispatch({ type: 'UPDATE_ARTIST_SEARCH', result: artistResult });
      if (sortBy === 'Track') dispatch({ type: 'UPDATE_TRACK_SEARCH', result: trackResult });
      if (sortBy === 'Album' || sortBy === 'AlbumsByArtist') {
        dispatch({ type: 'UPDATE_ALBUM_SEARCH', result: albumResult });
      }

      if (searchTerms.length < 1) dispatch({ type: 'CLEAR_SEARCH' });
    }

    updateSearchResults();
  }, [albumResult, artistResult, dispatch, searchTerms, sortBy, trackResult]);

  const renderResults = () => {
    if (Array.isArray(artist) && sortBy === "Artist") {
      return artist.map(artists => {
        return (
          <div className="Track" key={artists.id}>
            <div className="Track-information" onClick={() => getAlbums(artists.id, artists.name)}>
              <img src={artists.img[0].url} alt={artists.name}></img>
              <h1>{artists.name}</h1>
            </div>
          </div>
      )})
    }
    if (Array.isArray(album) && (sortBy === "Album" || sortBy === 'AlbumsByArtist')) {
      return album.map(albums => {
          return (
            <div className="Track" key={albums.id}>
              <div className="Track-information" id="album">
                <img src={albums.img[0].url} alt={albums.albumName} id="album"></img>
                <h3>{albums.albumName}</h3>
                <p>{ albums.artistName[0].name }</p>
              </div>
              <button className="Track-action" onClick={() => addAlbum(albums.id, albums.albumName)}>+</button>
            </div>
      )})
    }
    if (Array.isArray(track) && sortBy === "Track") {
      return track.map(tracks => {
          let trackInfo = {
            name: tracks.name,
            artistName: tracks.artistName[0].name,
            albumName: tracks.albumName,
            uri: tracks.uri
          }
          return (
            <div className="Track" key={tracks.uri}>
              <div className="Track-information">
                <h3>{ tracks.name }</h3>
                <p>{ tracks.artistName[0].name } | { tracks.albumName }</p>
              </div>
              <button className="Track-action" onClick={() => addTrack(trackInfo)}>+</button>
            </div>
      )})
    }

    return (<><br /><p className="empty-search-message">Search for something.</p></>);
  }

  return (
    <div className="SearchResults">
      <h2>Results</h2>
      <div className="SearchFilters">
        { renderSortByOptions() }
      </div>
      <div className="ResultList">
        { renderResults() }
      </div>
    </div>
  );
}
