import SpotifyWrapper from 'spotify-wrapper';
import 'whatwg-fetch';

let accessToken;
let userID;

export const Spotify = {
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
