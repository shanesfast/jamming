import 'whatwg-fetch';
import SpotifyWrapper from 'spotify-wrapper';

const client_id = '4160d0ec3a004092acdbba03d6e30a03';
const redirect_uri = 'http://localhost:3000/';

const url = 'https://accounts.spotify.com/authorize';
const scope = 'user-read-private user-read-email ' +
'playlist-modify-private playlist-read-private ' +
'playlist-modify-public playlist-read-collaborative';

// Generates a random string containing numbers and letters
// @param  {number} length The length of the string
// @return {string} The generated string
function generateRandomString(length) {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

let state = generateRandomString(16);

const urlRequest = url + "?client_id=" + client_id + "&response_type=token&redirect_uri="
+ redirect_uri + "&scope=" + scope + "&state=" + state;

let accessToken;
let expiration;
let userID;

export const Spotify = {

  //gets authorization token using Spotify's Implicit Grant method
  getAccess() {
    if (accessToken) {
      return accessToken;
    } else if (window.location.href.match(/access_token=([^&]*)/)) {
        let accessTokenArr = window.location.href.match(/access_token=([^&]*)/);
        let expirationArr = window.location.href.match(/expires_in=([^&]*)/);
        accessToken = accessTokenArr[1].toString();
        expiration = expirationArr[1];
        window.setTimeout(() => accessToken = '', expiration * 1000);
        window.history.pushState('Access Token', null, '/');
    } else {
        window.location = urlRequest;
    }

    // gets user ID
    fetch("https://api.spotify.com/v1/me", { headers: {
       'Authorization': 'Bearer ' + accessToken
     }
    }).then(response => {
      return response.json()
    })
    .then(jsonResponse => {
      userID = jsonResponse.id;
    })
    .catch(err => { console.log(err) });
  },

  // creates a new playlist on Spotify
  createPlayList(title, tracks) {
    // params for POST call to create playlist
    const titleRequest = new Request('https://api.spotify.com/v1/users/' + userID +
    '/playlists', {
    	method: 'POST',
    	headers: {
    		'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + accessToken
      },
      body: JSON.stringify({
        name: title
      })
    })

    // POST call to create the playlist, stored in a variable
    const addPlayList = fetch(titleRequest)
    .then(response => {
      if (response.ok) {
        console.log('Playlist created');
        return response.json();
      }
    })
    .then(jsonResponse => {
      return jsonResponse.id;
    })
    .catch(err => {
      console.log(err);
    })

    // POST call to add track to playlist, stored in a function
    function addTracks(trackRequest)  {
      return fetch(trackRequest)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
      })
      .then(jsonResponse => {
        console.log('Tracks added');
        return jsonResponse;
      })
      .catch(err => {
        console.log(err)
      })
    }

    // invokes create playlist POST call, then calls add-tracks POST call.
    // Only way I was able to get the playlist POST to resolve and return the
    // playlist ID before the add-tracks POST call was made.
    addPlayList
    .then(playListID => {
      let trackRequest = new Request('https://api.spotify.com/v1/users/' +
      userID + '/playlists/' + playListID + '/tracks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + accessToken
        },
        body: JSON.stringify({
          uris: tracks
        })
      })
      return trackRequest;
    })
    .then(trackRequest => {
      return addTracks(trackRequest)
    });

  },

  // all search methods below use the Spotify Wrapper API (https://github.com/willianjusten/spotify-wrapper)
  // to get data from Spotify
  searchArtist(terms) {
    const spotifyWrap = new SpotifyWrapper({
      token: accessToken
    });
    return spotifyWrap.search.artists(terms)
    .then(data => {
      if (data.artists.items && data.artists.items.length !== 0) {
        return data.artists.items.map((artist, i) => {
          if (data.artists.items[i].images.length === 0) {
            return {
              name: artist.name,
              img: [{url: './missing_photo.jpg'}]
            }
          } else {
            return {
              name: artist.name,
              img: artist.images
            };
          }
        });
      } else {
        return 'empty';
      }
    })
  },

  searchAlbum(terms) {
    const spotifyWrap = new SpotifyWrapper({
      token: accessToken
    });
    return spotifyWrap.search.albums(terms)
    .then(data => {
      if (data.albums.items && data.albums.items.length !== 0) {
        return data.albums.items.map((album, i) => {
          if (data.albums.items[i].images.length === 0) {
            return {
              albumName: album.name,
              artistName: album.artists,
              img: [{url: './missing_photo.jpg'}]
            }
          } else if (data.albums.items[i].artists.length === 0) {
              return {
                albumName: album.name,
                artistName: 'NoArtistFound',
                img: album.images
              };
          } else if (data.albums.items[i].images.length === 0
            && data.albums.items[i].artists.length === 0) {
              return {
                albumName: album.name,
                artistName: 'NoArtistFound',
                img: [{url: './missing_photo.jpg'}]
              };
          } else {
              return {
                albumName: album.name,
                artistName: album.artists,
                img: album.images
              };
          }
        });
      } else {
        return 'Null';
      }
    })
  },

  searchTracks(terms) {
    const spotifyWrap = new SpotifyWrapper({
      token: accessToken
    });
    return spotifyWrap.search.tracks(terms)
    .then(data => {
      if (data.tracks.items && data.tracks.items.length !== 0) {
        return data.tracks.items.map((track, i) => {
          if (data.tracks.items[i].artists.length === 0) {
            return {
              name: track.name,
              artistName: 'NoArtistFound',
              albumName: track.album.name
            }
          } else {
            return {
              name: track.name,
              artistName: track.artists,
              albumName: track.album.name
            };
          }
        });
      } else {
        return 'empty';
      }
    })
  }

};
