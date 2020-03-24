import React, { useContext } from 'react';
import { GlobalContext } from '../../context/GlobalState';
import { ResultList } from '../ResultList/ResultList.js';
import './SearchResults.css';

const sortByOptions = {
  "Artist": "Artist",
  "Album": "Album",
  "Track": "Track"
}

export const SearchResults = (props) => {
  const [state] = useContext(GlobalContext);
  const { artist, album, track } = state;
  const { sortBy, onClick, getAlbums, addAlbum, onAdd } = props;

  const renderSortByOptions = () => {
    return Object.keys(sortByOptions).map(sortValue => {
      return <h3 key={ sortValue }
              options={ sortValue }
              className={ getSortByClass(sortValue) }
              onClick={ handleClick }>
                { sortValue }
              </h3>
    });
  }

  const getSortByClass = (sortByOption) => {
    if (sortBy === sortByOption) {
      return "active";
    }
  }

  const handleClick = (e) => {
    let sortValue = e.target.innerHTML;
    onClick.handleSortByChange(sortValue);
  }

  const generateRandomString = (length) => {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  };

  if (Array.isArray(artist) && sortBy === "Artist") {
    return (
      <div className="SearchResults">
        <h2>Results</h2>
        <div className="SearchFilters">
          { renderSortByOptions() }
        </div>
        <div className="ResultList">
          {
            artist.map(artists =>
            {
              return (
                <ResultList
                  name={artists.name}
                  img={artists.img[0]}
                  artistId={artists.id}
                  sortBy={sortBy}
                  key={generateRandomString(16)}
                  getAlbums={getAlbums} />
            )})
          }
        </div>
      </div>
    );
  } else if (Array.isArray(album) && sortBy === "Album") {
    return (
      <div className="SearchResults">
        <h2>Results</h2>
        <div className="SearchFilters">
          { renderSortByOptions() }
        </div>
        <div className="ResultList">
          {
            album.map(albums =>
            {
              return (
                <ResultList
                  albumName={albums.albumName}
                  artistName={albums.artistName[0].name}
                  img={albums.img[0]}
                  sortBy={sortBy}
                  key={generateRandomString(16)}
                  albumId={albums.id}
                  addAlbum={addAlbum} />
            )})
          }
        </div>
      </div>
    );
  } else if (Array.isArray(track) && sortBy === "Track") {
    return (
      <div className="SearchResults">
        <h2>Results</h2>
        <div className="SearchFilters">
          { renderSortByOptions() }
        </div>
        <div className="ResultList">
          {
            track.map(tracks =>
            {
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
                  key={generateRandomString(16)}
                  onAdd={onAdd} />
            )})
          }
        </div>
      </div>
    );
  } else {
    return (
      <div className="SearchResults">
        <h2>Results</h2>
        <div className="SearchFilters">
          { renderSortByOptions() }
        </div>
        <div className="ResultList">
          <br /><p>Search for something.</p>
        </div>
      </div>
    );
  }
}
