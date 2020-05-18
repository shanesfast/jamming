import SpotifyWrapper from 'spotify-wrapper';
import 'whatwg-fetch';

let accessToken;

export const Spotify = {
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
