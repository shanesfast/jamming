import { Spotify } from '../Spotify.js';

export default (state, action) => {
  switch (action.type) {
    case 'UPDATE_SEARCH':
      return {
        ...state,
        musicInfo: {
          artist: action.payload.artists,
          album: action.payload.albums,
          track: action.payload.tracks
        }
      }
    default:
      return state;
  }
}