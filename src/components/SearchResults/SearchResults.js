import React, { Component } from 'react';
import { ResultList } from '../ResultList/ResultList.js';

const sortByOptions = {
  "Artist": "Artist",
  "Album": "Album",
  "Track": "Track"
}

export class SearchResults extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  renderSortByOptions() {
    return Object.keys(sortByOptions).map(sortByOption => {
      let sortByOptionValue = sortByOption;
      return <h3 key={ sortByOptionValue }
              options={ sortByOptionValue }
              className={ this.getSortByClass(sortByOptionValue) }
              onClick={ this.handleClick }>
                { sortByOption }
              </h3>
    });
  }

  getSortByClass(sortByOption) {
    if (this.props.sortBy === sortByOption) {
      return "active";
    }
  }

  handleClick(e) {
    let sortByOptionValue = e.target.innerHTML;
    this.props.onClick.handleSortByChange(sortByOptionValue);
  }

  generateRandomString(length) {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  };

  render() {

    if (Array.isArray(this.props.artist) && this.props.sortBy === "Artist") {
      return (
        <div className="SearchResults">
          <h2>Results</h2>
          <div className="SearchFilters">
            { this.renderSortByOptions() }
          </div>
          <div className="ResultList">
            {
              this.props.artist.map(artists =>
              {
                return <ResultList
                name={artists.name}
                img={artists.img[0]}
                sortBy={this.props.sortBy}
                key={this.generateRandomString(16)} />
              })
            }
          </div>
        </div>
      );
    } else if (Array.isArray(this.props.album) && this.props.sortBy === "Album") {
      return (
        <div className="SearchResults">
          <h2>Results</h2>
          <div className="SearchFilters">
            { this.renderSortByOptions() }
          </div>
          <div className="ResultList">
            {
              this.props.album.map(albums =>
              {
                return <ResultList
                name={albums.albumName}
                artistName={albums.artistName[0].name}
                img={albums.img[0]}
                sortBy={this.props.sortBy}
                key={this.generateRandomString(16)}
                id={albums.id}
                addAlbum={this.props.addAlbum} />
              })
            }
          </div>
        </div>
      );
    } else if (Array.isArray(this.props.track) && this.props.sortBy === "Track") {
      return (
        <div className="SearchResults">
          <h2>Results</h2>
          <div className="SearchFilters">
            { this.renderSortByOptions() }
          </div>
          <div className="ResultList">
            {
              this.props.track.map(tracks =>
              {
                return <ResultList
                name={tracks.name}
                artistName={tracks.artistName[0].name}
                albumName={tracks.albumName}
                trackInfo={{
                  name: tracks.name,
                  artistName: tracks.artistName[0].name,
                  albumName: tracks.albumName,
                  uri: tracks.uri
                }}
                sortBy={this.props.sortBy}
                key={this.generateRandomString(16)}
                onAdd={this.props.onAdd} />
              })
            }
          </div>
        </div>
      );
    } else {
      return (
        <div className="SearchResults">
          <h2>Results</h2>
          <div className="SearchFilters">
            { this.renderSortByOptions() }
          </div>
          <div className="ResultList">
            <br /><p>Search for something.</p>
          </div>
        </div>
      );
    }
  }
}
