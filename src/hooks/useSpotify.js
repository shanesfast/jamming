import { useContext, useEffect, useState } from 'react';
import SpotifyWrapper from 'spotify-wrapper';
import { v4 as uuidv4 } from 'uuid';
import 'whatwg-fetch';
import { AuthContext } from '../context/AuthContext';
import { SearchContext } from '../context/SearchContext';
import { PlayListContext } from '../context/PlayListContext';
import usePlaylist from './usePlaylist';

const useSpotify = () => {
  const [artistResult, setArtistResult] = useState();
  const [albumResult, setAlbumResult] = useState();
  const [trackResult, setTrackResult] = useState();

  const { state } = useContext(SearchContext);
  const { searchTerms, sortBy } = state;

  const { state: authState, dispatch: authDispatch } = useContext(AuthContext);
  const { spotifyAccessToken, spotifyClientID, spotifyUsername } = authState;

  const { state: playListState } = useContext(PlayListContext);
  const { editListPlayLists, playListPosition, playListTracks } = playListState;

  const { addTrack, clearPlayListTracks, closeEditPlayLists, populateUserPlayLists, updateEditPlaylistTracks, updateEditPlaylistPosition } = usePlaylist();

  useEffect(() => {
    function searchArtist(terms) {
      const spotifyWrap = new SpotifyWrapper({
        token: spotifyAccessToken
      });
      
      spotifyWrap.search.artists(terms)
      .then(data => {
        if (data.artists.items && data.artists.items.length) {
          return data.artists.items.map((artist) => {
            return {
              name: artist.name,
              img: artist.images.length ? artist.images : [{url: './missing_photo.jpg'}],
              id: artist.id
            };
          });
        } else return 'empty';
      })
      .then(artists => {
        return setArtistResult(artists);
      })
      .catch(err => alert(err.message));
    }
  
    function searchAlbum(terms) {
      const spotifyWrap = new SpotifyWrapper({
        token: spotifyAccessToken
      });
  
      spotifyWrap.search.albums(terms)
      .then(data => {
        if (data.albums.items && data.albums.items.length) {
          return data.albums.items.map((album, i) => {
            return {
              albumName: album.name,
              artistName: album.artists.length ? album.artists : 'No Artist Found',
              img: album.images.length? album.images : [{url: './missing_photo.jpg'}],
              id: album.id
            }
          });
        } else return 'empty';
      })
      .then(albums => {
        return setAlbumResult(albums);
      })
      .catch(err => alert(err.message));
    }
  
    function searchTrack(terms) {
      const spotifyWrap = new SpotifyWrapper({
        token: spotifyAccessToken
      });
      
      spotifyWrap.search.tracks(terms)
      .then(data => {
        if (data.tracks.items && data.tracks.items.length) {
          return data.tracks.items.map((track) => {
            return {
              name: track.name,
              artistName: track.artists.length ? track.artists : 'No Artist Found',
              albumName: track.album.name,
              uri: track.uri
            } 
          });
        } else return 'empty';
      })
      .then(tracks => {
        return setTrackResult(tracks);
      })
      .catch(err => alert(err.message));
    }

    function searchSpotify() {
      if (searchTerms.length > 0) {
        if (sortBy === 'Artist') return searchArtist(searchTerms);
        if (sortBy === 'Album') return searchAlbum(searchTerms);
        if (sortBy === 'Track') return searchTrack(searchTerms);
      }
    }

    searchSpotify();
  }, [searchTerms, sortBy, spotifyAccessToken]);

  function getTracksFromAlbum(id, name) {
    const spotifyWrap = new SpotifyWrapper({
      token: spotifyAccessToken
    });

    return spotifyWrap.album.getTracks(id)
    .then(data => {
      if (data.items && data.items.length) {
        return data.items.map((track, i) => {
          if (data.items[i].artists.length) {
            return {
              name: track.name,
              artistName: track.artists[0].name,
              albumName: name,
              uri: track.uri
            }
          } else {
            return {
              name: track.name,
              artistName: 'NoArtistFound',
              albumName: name,
              uri: track.uri
            }
          }
        })
      }
    })
    .then(tracks => { tracks.forEach(track => { addTrack(track) }) });
  }

  function getAlbumsFromArtist(id, artistName) {
    // Abort username request if it is taking too long
    const controller = new AbortController();
    const signal = controller.signal;
    setTimeout(() => controller.abort(), 6000);

    const albumRequest = new Request('https://api.spotify.com/v1/artists/' +
    id + '/albums', {
    	headers: {
        'Authorization': 'Bearer ' + spotifyAccessToken
      },
      signal
    })

    fetch(albumRequest)
    .then(response => { return response.json() })
    .then(jsonResponse => { return jsonResponse })
    .catch(err => { console.log(err) })
    .then(data => {
      if (data.items && data.items.length) {
        return data.items.map((albums) => {
          if (albums.images.length) {
            return {
              albumName: albums.name,
              artistName: [{name: artistName}],
              id: albums.id,
              img: albums.images
            }
          } else {
            return {
              albumName: albums.name,
              artistName: [{name: artistName}],
              id: albums.id,
              img: [{url: './missing_photo.jpg'}]
            }
          }
        });
      }
    })
    .then(albums => { 
      return setAlbumResult(albums) });
  }

  function getTracksFromPlayList(playlist_id) {
    let trackCount = 0; // number of songs in increments of 100
    let iterationCount = 1; // tracks number of times API call is made
    let offset = 0; // offsets track number for API call
    let playlistTracks = []; // used to store tracks gathered from each API call
    // Abort username request if it is taking too long
    const controller = new AbortController();
    const signal = controller.signal;
    setTimeout(() => controller.abort(), 6000);

    function fetchTracks() {
      return fetch(`https://api.spotify.com/v1/users/${spotifyUsername}/playlists/${playlist_id}/tracks?offset=${offset}&limit=100`,
        { headers: {
          'Authorization': 'Bearer ' + spotifyAccessToken
        },
        signal
      })
      .then(response => { return response.json() })
      .then(jsonResponse => {
        if (jsonResponse.items && jsonResponse.items.length) { 
          return jsonResponse.items.map((item, num) => {
            if (num === 99) {
              trackCount +=100;
            }
            return playlistTracks = [...playlistTracks,
              {
                track: item.track.name,
                artist: item.track.artists[0].name,
                album: item.track.album.name,
                uri: item.track.uri
              }
            ];
          });
        } else return playlistTracks;
      })
      .then(jsonResponse => {
        if (trackCount / iterationCount === 100) {
          iterationCount += 1;
          offset += 100;
          return fetchTracks();
        } else return playlistTracks;
      })
    }

    return fetchTracks()
    .then(data => {
      if (data) {
        return data.map(track => {
          return {
            artistName: track.artist,
            albumName: track.album,
            name: track.track,
            uri: track.uri
          }
        });
      } else return [];
    })
    .then(tracks => {
      if (tracks) {
        return tracks;
      }
    })
    .catch(err => { alert(`Getting tracks from playlist error: ${err.message}`); });
  }

  function getUserPlaylists() {
    // Abort request if it is taking too long
    const controller = new AbortController();
    const signal = controller.signal;
    setTimeout(() => controller.abort(), 6000);

    return fetch("https://api.spotify.com/v1/me/playlists", { headers: {
      'Authorization': 'Bearer ' + spotifyAccessToken
      },
      signal
    })
    .then(response => { return response.json() })
    .then(jsonResponse => {
      if (jsonResponse.items.length) {
        return jsonResponse.items.map((items, num) => {
          return {
            name: items.name,
            count: items.tracks.total,
            id: items.id,
            user: spotifyUsername,
            position: num
          }
        });
      }
    })
    .catch(err => { alert(`Getting playlists error: ${err.message}`); });
  }

  function openPlayLists(e) {
    e.preventDefault();

    if (closeEditPlayLists()) return;

    // Abort request if it is taking too long
    const controller = new AbortController();
    const signal = controller.signal;
    setTimeout(() => controller.abort(), 6000);

    fetch("https://api.spotify.com/v1/me/playlists", { headers: {
      'Authorization': 'Bearer ' + spotifyAccessToken
      },
      signal
    })
    .then(response => { return response.json() })
    .then(jsonResponse => {
      if (jsonResponse.items.length) {
        return jsonResponse.items.map((items, num) => {
          return {
            name: items.name,
            count: items.tracks.total,
            id: items.id,
            user: spotifyUsername,
            position: num
          }
        });
      }
    })
    .then(playlists => populateUserPlayLists(playlists))
    .catch(err => { alert(`Getting playlists error: ${err.message}`); });
  }

  function deletePlayList(id) {
    // Abort username request if it is taking too long
    const controller = new AbortController();
    const signal = controller.signal;
    setTimeout(() => controller.abort(), 6000);

    const titleRequest = new Request('https://api.spotify.com/v1/playlists/' + id +
    '/followers', {
    	method: 'DELETE',
    	headers: {
        'Authorization': 'Bearer ' + spotifyAccessToken
      },
      signal
    });

    return fetch(titleRequest)
      .then(response => { if (response.ok) console.log("Playlist successfully removed from your Spotify account.") })
      .catch(err => { alert(`Unfollowing playlist error: ${err.message}`) });
  }

  function savePlayList(title) {
    let tracks = [];
    playListTracks.map(track => { return tracks = [...tracks, track.uri] });

    // Abort username request if it is taking too long
    const controller = new AbortController();
    const signal = controller.signal;
    setTimeout(() => controller.abort(), 6000);

    const titleRequest = new Request('https://api.spotify.com/v1/users/' + spotifyUsername +
    '/playlists', {
    	method: 'POST',
    	headers: {
    		'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + spotifyAccessToken
      },
      body: JSON.stringify({ name: title }),
      signal
    });

    function addPlayList() { 
      return fetch(titleRequest)
      .then(response => {
        return response.json();
      })
      .then(jsonResponse => {        
        return jsonResponse.id;
      })
      .catch(err => { alert(`Adding playlist error: ${err.message}`) });
    }

    function addTracks(trackRequest)  {
      return fetch(trackRequest)
      .then(response => {
        return response.json();
      })
      .then(jsonResponse => {
        return jsonResponse;
      })
      .catch(err => { alert(`Adding tracks to playlist error: ${err.message}`); });
    }

    
    return addPlayList()
    .then(playListID => {
      let trackRequest = new Request('https://api.spotify.com/v1/users/' +
      spotifyUsername + '/playlists/' + playListID + '/tracks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + spotifyAccessToken
        },
        body: JSON.stringify({ uris: tracks }),
        signal
      });

      return [trackRequest, playListID];
    })
    .then(response => { 
      addTracks(response[0])
      clearPlayListTracks();
      return response[1]; 
    });
  }

  function updatePlayList(playlistId, newName, urisArray) {
    // Abort username request if it is taking too long
    const controller = new AbortController();
    const signal = controller.signal;
    setTimeout(() => controller.abort(), 6000);

    // Update playlist name if it changed
    if (newName !== editListPlayLists[playListPosition].name && newName.length > 0) {
      fetch(`https://api.spotify.com/v1/users/${spotifyUsername}/playlists/${playlistId}`,
      {
        method: 'PUT',
        headers: {
          'Authorization': 'Bearer ' + spotifyAccessToken,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: newName }),
        signal
      }
    )
    .catch(err => alert(`Error updating playlist name: ${err.message}`));
    }
    console.log(urisArray);
    // Update playlist Tracks
    const urisLength = urisArray.length;
    if (urisLength > 100) { // uses the Add Track to Playlist Endpoint if there are more than 100 tracks
      let trackOffset = Math.floor(urisLength / 100);
      let first100 = [...urisArray.slice(0, 100)];
      return fetch(`https://api.spotify.com/v1/users/${spotifyUsername}/playlists/${playlistId}/tracks`,
        {
          method: 'PUT',
          headers: {
            'Authorization': 'Bearer ' + spotifyAccessToken,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ uris: first100 }),
          signal
        }
      )
      .then(response => response.json())
      .then(jsonResponse => console.log(jsonResponse))
      .then(() => {
        for (let i = 0; i <= trackOffset; i++) {
          let offset_uris = [...urisArray.slice(trackOffset * 100, (trackOffset * 100) + 100)];
          return fetch(`https://api.spotify.com/v1/users/${spotifyUsername}/playlists/${playlistId}/tracks`,
            {
              method: 'POST',
              headers: {
                'Authorization': 'Bearer ' + spotifyAccessToken,
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ uris: offset_uris }),
              signal
            }
          )
          .then(response => response.json())
          .then(jsonResponse => console.log(jsonResponse))
          .catch(err => alert(`Error updating tracks: ${err.message}`));
        }
      });
    } else { // use replace tracks endpoint if less than 100 tracks
      return fetch(`https://api.spotify.com/v1/users/${spotifyUsername}/playlists/${playlistId}/tracks`,
        {
          method: 'PUT',
          headers: {
            'Authorization': 'Bearer ' + spotifyAccessToken,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ uris: urisArray }),
          signal
        }
      )
      .then(response => response.json())
      .then(jsonResponse => console.log(jsonResponse))
      .catch(err => alert(`Error updating tracks: ${err.message}`));
    }
  }

  function getSpotifyAccess() {
    const scope = 'user-read-private user-read-email ' +
    'playlist-modify-private playlist-read-private ' +
    'playlist-modify-public playlist-read-collaborative';
    const spotifyRedirectUri = process.env.REACT_APP_REDIRECT_URI;
    const url = 'https://accounts.spotify.com/authorize';

    const urlRequest = url + "?client_id=" + spotifyClientID + "&response_type=token&redirect_uri="
          + spotifyRedirectUri + "&scope=" + scope + "&state=" + uuidv4() + "&show_dialog=true";

    let popup = window.open(urlRequest, 'Sign in with Spotify', 'width=800,height=600');

    window.spotifyCallback = (token) => {
      popup.close();
      authDispatch({ type: 'SET_ACCESS_TOKEN', token });
      const expireAt = new Date();
      const time = expireAt.getTime();
      expireAt.setTime(time + 1000*3600);
      
      if (process.env.NODE_ENV === 'production')
        document.cookie = `secure_token=${token}; expires=${expireAt.toUTCString()}; secure;`;
      else 
        document.cookie = `token=${token}; expires=${expireAt.toUTCString()};`;

      // Gets then Sets Spotify Username
      const usernameRequest = new Request('https://api.spotify.com/v1/me', 
      { headers: {
          'Authorization': 'Bearer ' + token
        }
      })

      fetch(usernameRequest)
      .then(response => { return response.json() })
      .then(response => { 
        authDispatch({ type: 'SET_USERNAME', username: response.id })

        if (process.env.NODE_ENV === 'production') {
          document.cookie = `secure_username=${response.id}; expires=${expireAt.toUTCString()}; secure;`;
        }

        else document.cookie = `username=${response.id}; expires=${expireAt.toUTCString()};`;
      })
      .catch(err => { console.log(`Get Spotify Username Error: ${err}`) });
    }
  }

  return {
    artistResult,
    albumResult,
    deletePlayList,
    getAlbumsFromArtist,
    getSpotifyAccess,
    getTracksFromAlbum,
    getTracksFromPlayList,
    getUserPlaylists,
    openPlayLists,
    savePlayList,
    trackResult,
    updatePlayList
  }
}

export default useSpotify;