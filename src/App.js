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
    this.handleSortByChange = this.handleSortByChange.bind(this);
    this.handleInputValue = this.handleInputValue.bind(this);
  }

  updateSearch(terms) {
    console.log('triggered!');
    if (terms.length > 0 && this.state.sortBy === "Artist") {
      Spotify.searchArtist(terms)
      .then(artists => {
        this.setState({
          artist: artists
        });
      });
    } else if (terms.length > 0 && this.state.sortBy === "Album") {
      Spotify.searchAlbum(terms)
      .then(albums => {
        this.setState({
          album: albums
        });
      });
    } else if (terms.length > 0 && this.state.sortBy === "Track") {
      Spotify.searchTracks(terms)
      .then(tracks => {
        console.log(tracks);
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

  handleSortByChange(sortByOption) {
    this.setState({
      sortBy: sortByOption
    });
  }

  handleInputValue(searchText) {
    this.updateSearch(searchText);
    this.setState({
      search: searchText
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
          handleInputValue: this.handleInputValue
        }}
        sortBy={this.state.sortBy} />
      </div>
    );
  }
}

export default App;
