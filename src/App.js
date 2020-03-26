import React, { Component } from 'react';
import { SearchBar } from './components/SearchBar/SearchBar.js';
import { AppPlayList } from './components/AppPlayList/AppPlayList.js';
import { ListOfPlayLists } from './components/ListOfPlayLists/ListOfPlayLists.js';
import { Spotify } from './Spotify.js';

import { GlobalProvider } from './context/GlobalState';

import './App.css';

class App extends Component {

  state = {
    artist: '',
    album: '',
    track: '',
    sortBy: "Track",
    playListTracks: [],
    editList: 'closed',
    editListPlayLists: [{}],
    editListTracks: [],
    editBox: 'closed',
    position: 0,
    pageOfItems: []
  };

  savePlayList = (title) => {
    let uris = [];
    this.state.playListTracks.map(track => {
      uris = [...uris, track.uri];
      return null;
    })
    Spotify.createPlayList(title, uris);
    this.setState({
      playListTracks: []
    })
  }

  updatePlaylist = (playlist_id, new_name, uris_array) => {
    if (new_name !== this.state.editListPlayLists[this.state.position].name && new_name.length > 0) {
      Spotify.updatePlaylistName(playlist_id, new_name);
    }

    Spotify.updatePlaylistTracks(playlist_id, uris_array);
  }

  // openPlayLists = (e) => {
  //   if (this.state.editList === 'open') {
  //     this.setState({ editList: 'closed' });
  //   } else {
  //     this.setState({ editList: 'open' });
  //     Spotify.getPlayLists()
  //     .then(playlists => {
  //       this.setState({ editListPlayLists: playlists });
  //     });
  //   }
  // }

  addEntireAlbum = (id, name) => {
    Spotify.getTracksFromAlbum(id, name)
    .then(tracks => {
      tracks.forEach(track => {
        this.addTrack(track);
      });
    });
  }

  getAlbums = (id, name) => {
    Spotify.getAlbumsFromArtist(id, name)
    .then(album => {
      this.setState({
        album: album,
        sortBy: "Album"
      })
    })
  }

  handleSortByChange = (sortByOption) => {
    this.setState({
      sortBy: sortByOption
    });
  }

  // getPosition = (spot) => {
  //   if (spot === this.state.position) {
  //     return;
  //   } else {
  //     this.setState({ position: spot });
  //   }
  // }

  componentDidMount() {
    Spotify.getAccess();
  }

  componentDidUpdate(nextProps, nextState) {
    Spotify.getAccess();
  }

  render() {
    return (
      <GlobalProvider>
        <div className="App">
          <h1>Quick J<i className="highlight">amm</i>in&#39;</h1>
          <SearchBar onChange={this.updateSearch} />
          <AppPlayList
            artist={this.state.artist}
            album={this.state.album}
            track={this.state.track}
            playListTracks={this.state.playListTracks}
            onClick={{
              handleSortByChange: this.handleSortByChange,
              savePlayList: this.savePlayList,
              updatePlayList: this.updatePlaylist,
              open: this.openPlayLists
            }}
            onAdd={this.addTrack}
            remove={this.removeTrack}
            sortBy={this.state.sortBy}
            addAlbum={this.addEntireAlbum}
            getAlbums={this.getAlbums}
            showEditBox={this.state.editBox}
            editListPlayLists={this.state.editListPlayLists}
            editListTracks={this.state.editListTracks}
            position={this.state.position}
            pagination={{
              pageOfItems: this.state.pageOfItems,
              onChangePage: this.onChangePage
            }} />
          <ListOfPlayLists />
        </div>
      </GlobalProvider>
    );
  }
}

export default App;
