// eslint-disable-next-line
export const searchReducer = (state, action) => {
  switch (action.type) {
      case 'CLEAR_SEARCH':
        return {
            ...state,
            artist: '',
            album: '',
            track: ''
        }

      case 'UPDATE_ARTIST_SEARCH':
        return {
          ...state,
          artist: action.result
        }

      case 'UPDATE_ALBUM_SEARCH':
        return {
          ...state,
          album: action.result
        }

      case 'UPDATE_TRACK_SEARCH':
        return {
          ...state,
          track: action.result
        }

      case 'UPDATE_SORT_BY':
        return {
          ...state,
          sortBy: action.option
        }

      case 'UPDATE_SEARCH_TERMS':
        return {
          ...state,
          searchTerms: action.search
        }

      default:
          return state;
  }
}