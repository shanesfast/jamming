import React, { Component} from 'react';
import './App.css';
import { SearchBar } from './components/SearchBar/SearchBar.js';
import { AppPlayList } from './components/AppPlayList/AppPlayList.js';
import { ListOfPlayLists } from './components/ListOfPlayLists/ListOfPlayLists.js';
import { Spotify } from './Spotify.js';

class App extends Component {

  state = {
    artist: '',
    album: '',
    track: '',
    sortBy: "Track",
    playListTracks: [],
    editList: 'closed',
    editListPlayLists: [{}]
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
    })
    Spotify.createPlayList(title, uris);
    this.setState({
      playListTracks: []
    })
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
        })
      } else {
        window.alert('You cannot edit this playlist.' +
        'Most likely because you do not "own" it.' +
        'It may have been created by Spotify for you.')
      }
    })
    .then(tracks => {
      if (tracks) {
        this.setState({
          playListTracks: tracks,
          editList: 'closed'
        });
      }
    });
  }

  addTrack = (trackInfo) => {
    if (this.state.playListTracks.find(savedTrack => savedTrack.uri === trackInfo.uri)) {
      return;
    }
    this.setState(prevState => ({
        playListTracks: [...prevState.playListTracks, trackInfo]
      })
    )
  }

  removeTrack = (uri) => {
    let trackArray = [...this.state.playListTracks];
    let removeThis = trackArray.find(savedTrack => {
      if (savedTrack.uri === uri) {
        return savedTrack;
      } else {
        return;
      }
    })
    function remove(array, element) {
      const index = array.indexOf(element);

      if (index !== -1) {
        array.splice(index, 1);
      }
    }

    remove(trackArray, removeThis);
    this.setState({
      playListTracks: trackArray
    });
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

  componentDidMount() {
    Spotify.getAccess();
  }

  componentWillUpdate(nextProps, nextState) {
    Spotify.getAccess();
  }

  render() {
    return (
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
            open: this.openPlayLists,
            getPlayLists: this.getPlayLists
          }}
          onAdd={this.addTrack}
          remove={this.removeTrack}
          sortBy={this.state.sortBy}
          addAlbum={this.addEntireAlbum}
          getAlbums={this.getAlbums} />
        <ListOfPlayLists
          show={this.state.editList}
          toggle={this.openPlayLists}
          playlists={this.state.editListPlayLists}
          getTracks={this.getTracksFromPlayList} />
      </div>
    );
  }
}

export default App;
