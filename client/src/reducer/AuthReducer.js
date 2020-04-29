// eslint-disable-next-line
export const authReducer = (state, action) => {
  switch (action.type) {
    case 'PRIOR_SESSION':
      return { ...state, isAuthenticated: true }

    case 'SET_ACCESS_TOKEN':
      return { ...state, 
               spotifyAccessToken: action.token,
               isAuthenticated: true 
             }

    case 'SET_USERNAME':
      return { ...state, spotifyUsername: action.username }

    default:
      return state;
  }
}