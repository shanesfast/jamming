import React, { Component } from 'react';
import { SearchResults } from '../SearchResults/SearchResults.js';
import { PlayList } from '../PlayList/PlayList.js';

export class AppPlayList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="App-playlist">
        <SearchResults
        artist={this.props.artist}
        album={this.props.album}
        track={this.props.track}
        onClick={this.props.onClick}
        sortBy={this.props.sortBy} />
        <PlayList onClick={this.props.onClick} />
      </div>
    );
  }
}
