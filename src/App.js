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

  updateSearch = (terms) => {
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

  openPlayLists = (e) => {
    if (this.state.editList === 'open') {
      this.setState({ editList: 'closed' });
    } else {
      this.setState({ editList: 'open' });
      Spotify.getPlayLists()
      .then(playlists => {
        this.setState({ editListPlayLists: playlists });
      });
    }
  }

  getTracksFromPlayList = (playlist_id) => {
    Spotify.getTracksFromPlayList(playlist_id)
    .then(data => {
      if (Array.isArray(data)) {
        return data.map(track => {
          return {
            artistName: track.artist,
            albumName: track.album,
            name: track.track,
            uri: track.uri
          }
        });
      } else if (data === undefined) {
        return []; // the state expects an array, so an empty
      }           // array is returned if there is no data to avoid errors
    })
    .then(tracks => {
      if (tracks) {
        this.setState({
          editListTracks: tracks,
          editList: 'closed',
          editBox: 'open'
        });
      }
    });
  }

  addTrack = (trackInfo) => {
    if (this.state.editBox === 'open') {
      if (this.state.editListTracks.find(savedTrack => savedTrack.uri === trackInfo.uri)) {
        return;
      }
      this.setState(prevState => ({
          editListTracks: [...prevState.editListTracks, trackInfo]
        })
      );
      return;
    }

    if (this.state.playListTracks.find(savedTrack => savedTrack.uri === trackInfo.uri)) {
      return;
    }
    this.setState(prevState => ({
        playListTracks: [...prevState.playListTracks, trackInfo]
      })
    );
  }

  removeTrack = (uri, list) => {
    let trackArray;

    if (list === 'editListTracks') {
      trackArray = [...this.state.editListTracks]
    } else {
      trackArray = [...this.state.playListTracks];
    }

    let removeThis = trackArray.find(savedTrack => {
      if (savedTrack.uri === uri) {
        return savedTrack;
      } else {
        return null;
      }
    });

    function remove(array, element) {
      const index = array.indexOf(element);

      if (index !== -1) {
        array.splice(index, 1);
      }
    }

    remove(trackArray, removeThis);

    if (list === 'editListTracks') {
      this.setState({ editListTracks: trackArray });
    } else {
      this.setState({ playListTracks: trackArray });
    }
  }

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

  getPosition = (spot) => {
    if (spot === this.state.position) {
      return;
    } else {
      this.setState({ position: spot });
    }
  }

  onChangePage = (pageOfItems) => { // handles pagination
        // update state with new page of items
        this.setState({ pageOfItems: pageOfItems });
    }

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
          <ListOfPlayLists
            show={this.state.editList}
            toggle={this.openPlayLists}
            playlists={this.state.editListPlayLists}
            getTracks={this.getTracksFromPlayList}
            getPosition={this.getPosition} />
        </div>
      </GlobalProvider>
    );
  }
}

export default App;
