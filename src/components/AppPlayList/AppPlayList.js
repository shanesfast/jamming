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
        onAdd={this.props.onAdd}
        sortBy={this.props.sortBy}
        addAlbum={this.props.addAlbum}
        getAlbums={this.props.getAlbums} />
        <PlayList
        artist={this.props.artist}
        album={this.props.album}
        track={this.props.track}
        playListTracks={this.props.playListTracks}
        onClick={this.props.onClick}
        remove={this.props.remove} />
      </div>
    );
  }
}
