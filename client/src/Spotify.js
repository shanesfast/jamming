import SpotifyWrapper from 'spotify-wrapper';
import 'whatwg-fetch';

let accessToken;
let userID;

export const Spotify = {
  // Gets tracks from a users playList
  getTracksFromPlayList(playlist_id) {
    let trackCount = 0; // keeps track of the number of songs while making API calls ( in increments of 100)
    let iterationCount = 1; // tracks the number of times the API call is made, used as a check before returning any data
    let offset = 0; // offsets the track number for the API call
    let playlistTracks = []; // used to store the tracks gathered from each API call

    // this function is used to make the API call. Wrote as a function so it could be reusable.
    const fetchTracks = () => {
      return fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${playlist_id}/tracks?offset=${offset}&limit=100`,
        { headers: {
          'Authorization': 'Bearer ' + accessToken
        }
      })
      .then(response => { return response.json(); })
      .then(jsonResponse => {
        if (jsonResponse.items && jsonResponse.items.length !== 0) {    //ensures there is data coming in
          return jsonResponse.items.map((item, num) => { // map appends playlistTracks array with current data
            if (num === 99) { // check to see if the trackCount needs to be updated
              trackCount +=100;
            }
            return playlistTracks = [...playlistTracks, // using spread operator to update the playlistTracks array
              {
                track: item.track.name,
                artist: item.track.artists[0].name,
                album: item.track.album.name,
                uri: item.track.uri
              }
            ];
          });
        } else { return playlistTracks; }
      })
      .then(jsonResponse => {
        if (trackCount / iterationCount === 100) { // checks if the number of songs divided by
          iterationCount += 1;                    // the iteration count is 100; to check if there are more
          offset += 100;                         //  tracks to be fetched from the playlist. If so, increments the
          return fetchTracks();                        //  iterationCount and offset for the next API call
        } else { return playlistTracks; }
      })
      .catch(err => { console.log(err); });
    }
    return fetchTracks();
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
    });

    // POST call to create the playlist, stored in a variable
    const addPlayList = fetch(titleRequest)
    .then(response => {
      if (response.ok) {
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

  updatePlaylistName(playlist_id, new_name) { // changes a playlists name
    return fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${playlist_id}`,
      {
        method: 'PUT',
        headers: {
          'Authorization': 'Bearer ' + accessToken,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: new_name
        })
      }
    )
    .then(response => response.json())
    .then(jsonResponse => console.log(jsonResponse))
    .catch(err => console.log(err));
  },

  updatePlaylistTracks(playlist_id, uris_array) { // replaces a playlists tracks
    const uris_length = uris_array.length;
    if (uris_length > 100) { // uses the Add Tack to Playlist Endpoint if there are more than 100 tracks
      let track_offset = Math.floor(uris_length / 100);
      let first100 = [...uris_array.slice(0, 100)];
      return fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${playlist_id}/tracks`,
        {
          method: 'PUT',
          headers: {
            'Authorization': 'Bearer ' + accessToken,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            uris: first100
          })
        }
      )
      .then(response => response.json())
      .then(jsonResponse => console.log(jsonResponse))
      .catch(err => console.log(err))
      .then(data => {
        for (let i = 0; i <= track_offset; i++) {
          let offset_uris = [...uris_array.slice(track_offset * 100, (track_offset * 100) + 100)];
          return fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${playlist_id}/tracks`,
            {
              method: 'POST',
              headers: {
                'Authorization': 'Bearer ' + accessToken,
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                uris: offset_uris
              })
            }
          )
          .then(response => response.json())
          .then(jsonResponse => console.log(jsonResponse))
          .catch(err => console.log(err));
        }
      });
    } else { // uses just the replace tracks endpoint if less than 100 tracks
      return fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${playlist_id}/tracks`,
        {
          method: 'PUT',
          headers: {
            'Authorization': 'Bearer ' + accessToken,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            uris: uris_array
          })
        }
      )
      .then(response => response.json())
      .then(jsonResponse => console.log(jsonResponse))
      .catch(err => console.log(err));
    }
  },

  getAlbumsFromArtist(id, artistName, signal) {
    const albumRequest = new Request('https://api.spotify.com/v1/artists/' +
    id + '/albums', {
    	headers: {
        'Authorization': 'Bearer ' + accessToken
      }, signal: signal
    })

    // GET call to retrieve album data
    return fetch(albumRequest)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
    })
    .then(jsonResponse => {
      return jsonResponse;
    })
    .catch(err => {
      console.log(err);
    })
    .then(data => {
      if (data.items) {
        if (data.items.length !== 0) {
          return data.items.map((albums, i) => {
            if (albums.images.length === 0) {
              return {
                albumName: albums.name,
                artistName: [{name: artistName}],
                id: albums.id,
                img: [{url: './missing_photo.jpg'}]
              }
            } else {
              return {
                albumName: albums.name,
                artistName: [{name: artistName}],
                id: albums.id,
                img: albums.images
              }
            }
          });
        }
      }
    });
  },

  getTracksFromAlbum(id, name, signal) {
    const spotifyWrap = new SpotifyWrapper({
      token: accessToken,
      signal: signal
    });
    return spotifyWrap.album.getTracks(id)
    .then(data => {
      if (data.items) {
        if (data.items.length !== 0) {
          return data.items.map((track, i) => {
            if (data.items[i].artists.length === 0) {
              return {
                name: track.name,
                artistName: 'NoArtistFound',
                albumName: name,
                uri: track.uri
              }
            } else {
              return {
                name: track.name,
                artistName: track.artists[0].name,
                albumName: name,
                uri: track.uri
              };
            }
          })
        }
      }
    })
  }

};
