const defaultState = {
  user: null,
  signedIn: false,
  selectedSong: false,
  searching: false,
  searchResults: null,
  song: null,
  annotation:{
    addingAnnotation: false,
    annotationHeight: null,
    highlightedText: null,
    showAnnotation: false
  },
  playlists: null,
  currentPlaylistTracks: null,
  loadingTracks: false
}



export default function rootReducer(state = defaultState, action) {
  switch(action.type) {
    case "SEARCH_SONG":
      let info = {songname: action.payload.songName, artist: action.payload.artistName}
      return{
        ...state, selectedSong: info
      }
    case "SEARCHING_SONGS":
      return{...state,
        selectedSong: false,
        searching: true,
        searchResults: null,
        song: null
      }
    case "FOUND_SONGS":
      return{...state,
        searching: false,
        searchResults: action.payload,
        song: null,
        annotation:{}
      }
    case "ANNOTATING":
      return{
        ...state, annotation: {
          addingAnnotation: true,
          annotationHeight: action.payload.annotationHeight,
          highlightedText: action.payload.highlightedText,
          showAnnotation: false
        }
      }
    case "SUBMIT_ANNOTATION":
      let annotatedLyrics = state.song.lyrics
      let selectedText = state.annotation.highlightedText.replace(/\n/g, "<br />")
      let wrappedText = `<a class="annotation" id=${action.payload.annotationId} onClick={}>` + selectedText + "</a>"
      let reg = new RegExp(selectedText, "g")

      if(annotatedLyrics.match(reg) === null){
        annotatedLyrics = annotatedLyrics.replace(selectedText, wrappedText)
      }else{
        annotatedLyrics = annotatedLyrics.replace(reg, wrappedText)
      }
      fetch(`http://localhost:3000/api/v1/songs/${state.song.id}`,{
        method: "PATCH",
        headers: {
          Accept: 'application/json',
          'Content-Type': "application/json"
        },
        body: JSON.stringify({
          lyrics: annotatedLyrics
        })
      })
      return{
        ...state,
        song: {...state.song,
            lyrics: annotatedLyrics
          },
        annotation: {
          addingAnnotation: false,
          highlightedText: null
        }
      }
    case "SHOW_ANNOTATION":
      console.log(state)
      return {
        ...state,
        annotation: {
          ...state.annotation,
          showAnnotation: action.payload.annotations,
          annotationHeight: action.payload.height,
          addingAnnotation: false
        }
      }
    case "CHAINED_ANNOTAION":
      return {
        ...state,
        annotation: {
          addingAnnotation: false,
          highlightedText: null
        }
      }
    case "LOADING_SONG":
      return{...state,
        selectedSong: true,
        song: null
      }
    case "LOAD_LYRICS":
      return{...state,
        selectedSong: true,
        song: action.payload
      }
    case "STARTING_SIGN_IN":
      return{...state,
        signedIn: true
      }
    case "SPOTIFY_SIGN_IN":
      // localStorage
      return{...state,
        user: action.payload.user
      }
    case "FETCHED_PLAYLISTS":
      return{
        ...state,
        playlists: action.payload,
        currentPlaylistTracks: null
      }
    case "LOADING_TRACKS":
      return{
        ...state,
        loadingTracks: true,
        playlists: null
      }
    case "GET_PLAYLIST_TRACKS":
      return{
        ...state,
        loadingTracks: false,
        playlists: null,
        currentPlaylistTracks: action.payload
      }
    case "SWITCH_TABS":
      return {
        ...state,
        selectedSong: false,
        song: null,
        annotation:{
          addingAnnotation: false,
          annotationHeight: null,
          highlightedText: null,
          showAnnotation: false
        }
      }
    case "LOGOUT":
      return defaultState
    default:
      return {...state,
        annotation: {
          addingAnnotation: false,
          annotationHeight: null,
          highlightedText: null,
          showAnnotation: false
        }
      };
  }
}
