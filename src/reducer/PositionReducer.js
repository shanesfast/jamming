// eslint-disable-next-line
export const positionReducer = (state, action) => {
  switch (action.type) {
      case 'UPDATE_POSITION':
          return {
              playListPosition: action.position
          };
      default:
          return state;
  }
}