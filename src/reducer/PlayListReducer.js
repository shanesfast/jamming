// eslint-disable-next-line
export const playListReducer = (state, action) => {
  const { editListTracks, playListTracks } = state;
  switch (action.type) {
      case 'REMOVE_EDIT_LIST_TRACKS':
        return { ...state, editListTracks: action.tracks }

      case 'REMOVE_PLAY_LIST_TRACKS':
          return { ...state, playListTracks: action.tracks }

      case 'SET_EDIT_LIST_TRACKS':
          return { ...state, editListTracks: action.tracks }

      case 'UPDATE_EDIT_LIST_TRACKS':
          return { ...state, editListTracks: [...editListTracks, action.tracks] }

      case 'UPDATE_EDIT_PLAY_LISTS':
        return { ...state, editListPlayLists: action.lists }

      case 'UPDATE_PLAY_LIST_TRACKS':
          return { ...state, playListTracks: [...playListTracks, action.tracks] }

      case 'UPDATE_SHOW_EDIT_BOX':
          return { ...state, editBoxIsOpen: action.show }

      case 'UPDATE_SHOW_EDIT_LIST':
        return { ...state, editListIsOpen: action.show }

      default:
          return state;
  }
}