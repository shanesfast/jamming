import React, { useContext } from 'react';
import { SearchContext } from '../../context/SearchContext';
import { ResultList } from '../ResultList/ResultList.js';
import useSpotifyApiCalls from '../../hooks/useSpotifyApiCalls';

import './SearchResults.css';

const sortByOptions = ['Artist', 'Album', 'Track'];

export const SearchResults = (props) => {
  const { state, dispatch } = useContext(SearchContext);
  const { artist, album, track, searchTerms, sortBy } = state;
  const { artistResult, albumResult, trackResult } = useSpotifyApiCalls();

  const { getAlbums, addAlbum, onAdd } = props;

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

  const setSortByClass = (sortByOption) => {
    if (sortBy === sortByOption) {
      return "active";
    }
  }

  const handleSortBy = (e) => {
    let sortValue = e.target.innerHTML;
    dispatch({ type: 'UPDATE_SORT_BY', option: sortValue });
  }

  React.useEffect(() => {
    const updateSearchResults = () => {
      if (searchTerms.length > 0) {
        if (sortBy === 'Artist') dispatch({ type: 'UPDATE_ARTIST_SEARCH', result: artistResult });
        if (sortBy === 'Album') dispatch({ type: 'UPDATE_ALBUM_SEARCH', result: albumResult });
        if (sortBy === 'Track') dispatch({ type: 'UPDATE_TRACK_SEARCH', result: trackResult });
      }
    }

    updateSearchResults();
  }, [albumResult, artistResult, dispatch, searchTerms, sortBy, trackResult]);

  const renderResults = () => {
    if (Array.isArray(artist) && sortBy === "Artist") {
      return artist.map(artists => {
        return (
          <ResultList
            name={artists.name}
            img={artists.img[0]}
            artistId={artists.id}
            sortBy={sortBy}
            key={artists.id}
            getAlbums={getAlbums} />
      )})
    }
    if (Array.isArray(album) && sortBy === "Album") {
      return album.map(albums => {
          return (
            <ResultList
              albumName={albums.albumName}
              artistName={albums.artistName[0].name}
              img={albums.img[0]}
              sortBy={sortBy}
              key={albums.id}
              albumId={albums.id}
              addAlbum={addAlbum} />
      )})
    }
    if (Array.isArray(track) && sortBy === "Track") {
      return track.map(tracks => {
          return (
            <ResultList
              name={tracks.name}
              artistName={tracks.artistName[0].name}
              albumName={tracks.albumName}
              trackInfo={{
                name: tracks.name,
                artistName: tracks.artistName[0].name,
                albumName: tracks.albumName,
                uri: tracks.uri
              }}
              sortBy={sortBy}
              key={tracks.uri}
              onAdd={onAdd} />
      )})
    }
    return (<><br /><p>Search for something.</p></>);
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
