const defaultState = {
  user: null,
  searchInfo: null,
  song: null,
}



export default function rootReducer(state = defaultState, action) {
  switch(action.type) {
    case "SEARCH_SONG":
      let info = {songname: action.payload.form.children[0].value, artist: action.payload.form.children[2].value}
      return({
        ...state, searchInfo: info, song: null
      })
    break;
    case "HIGHLIGHT_TO_ANNOTATE":
      return
    break;
    default:
      return state;
  }
}
