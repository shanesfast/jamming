import React from 'react';
import { ResultList } from '../ResultList/ResultList.js';
import './SearchResults.css';

const sortByOptions = {
  "Artist": "Artist",
  "Album": "Album",
  "Track": "Track"
}

export const SearchResults = (props) => {

  const renderSortByOptions = () => {
    return Object.keys(sortByOptions).map(sortByOption => {
      let sortByOptionValue = sortByOption;
      return <h3 key={ sortByOptionValue }
              options={ sortByOptionValue }
              className={ getSortByClass(sortByOptionValue) }
              onClick={ handleClick }>
                { sortByOption }
              </h3>
    });
  }

  const getSortByClass = (sortByOption) => {
    if (props.sortBy === sortByOption) {
      return "active";
    }
  }

  const handleClick = (e) => {
    let sortByOptionValue = e.target.innerHTML;
    props.onClick.handleSortByChange(sortByOptionValue);
  }

  const generateRandomString = (length) => {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  };

  if (Array.isArray(props.artist) && props.sortBy === "Artist") {
    return (
      <div className="SearchResults">
        <h2>Results</h2>
        <div className="SearchFilters">
          { renderSortByOptions() }
        </div>
        <div className="ResultList">
          {
            props.artist.map(artists =>
            {
              return (
                <ResultList
                  name={artists.name}
                  img={artists.img[0]}
                  artistId={artists.id}
                  sortBy={props.sortBy}
                  key={generateRandomString(16)}
                  getAlbums={props.getAlbums} />
            )})
          }
        </div>
      </div>
    );
  } else if (Array.isArray(props.album) && props.sortBy === "Album") {
    return (
      <div className="SearchResults">
        <h2>Results</h2>
        <div className="SearchFilters">
          { renderSortByOptions() }
        </div>
        <div className="ResultList">
          {
            props.album.map(albums =>
            {
              return (
                <ResultList
                  albumName={albums.albumName}
                  artistName={albums.artistName[0].name}
                  img={albums.img[0]}
                  sortBy={props.sortBy}
                  key={generateRandomString(16)}
                  albumId={albums.id}
                  addAlbum={props.addAlbum} />
            )})
          }
        </div>
      </div>
    );
  } else if (Array.isArray(props.track) && props.sortBy === "Track") {
    return (
      <div className="SearchResults">
        <h2>Results</h2>
        <div className="SearchFilters">
          { renderSortByOptions() }
        </div>
        <div className="ResultList">
          {
            props.track.map(tracks =>
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
                  sortBy={props.sortBy}
                  key={generateRandomString(16)}
                  onAdd={props.onAdd} />
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
