import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { SearchBar } from './components/SearchBar/SearchBar.js';
import { AppPlayList } from './components/AppPlayList/AppPlayList.js';
import { Spotify } from './Spotify.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      artist: '',
      album: '',
      track: '',
      sortBy: "Track",
      search: ''
     };
    this.updateSearch = this.updateSearch.bind(this);
    this.savePlayList = this.savePlayList.bind(this);
    this.handleSortByChange = this.handleSortByChange.bind(this);
  }

  updateSearch(terms) {
    if (terms.length > 0) {
      Spotify.searchArtist(terms)
      .then(artists => {
        this.setState({
          artist: artists
        });
      });
      Spotify.searchAlbum(terms)
      .then(albums => {
        this.setState({
          album: albums
        });
      });
      Spotify.searchTracks(terms)
      .then(tracks => {
        this.setState({
          track: tracks
        });
      });
    } else {
      this.setState({
        artist: '',
        album: '',
        track: ''
      })
    }
  }

  savePlayList(title, tracks) {
    Spotify.createPlayList(title, tracks);
  }

  handleSortByChange(sortByOption) {
    this.setState({
      sortBy: sortByOption
    });
  }

  componentDidMount() {
    Spotify.getAccess();
  }

  componentWillUpdate(nextProps, nextState) {
    Spotify.getAccess();
  }

  render() {
    return (
      <div className="App">
        <SearchBar onChange={this.updateSearch} />
        <AppPlayList
        artist={this.state.artist}
        album={this.state.album}
        track={this.state.track}
        onClick={{
          handleSortByChange: this.handleSortByChange,
          savePlayList: this.savePlayList
        }}
        sortBy={this.state.sortBy} />
      </div>
    );
  }
}

export default App;
