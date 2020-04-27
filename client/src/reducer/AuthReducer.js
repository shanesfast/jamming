// eslint-disable-next-line
export const authReducer = (state, action) => {
  switch (action.type) {
    case 'PRIOR_SESSION_AUTH':
        return { ...state, isAuthenticated: true }

    default:
        return state;
  }
}