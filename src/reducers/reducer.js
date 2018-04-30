const defaultState = {
  user: null,
  selectedSong: false,
  searching: false,
  searchResults: null,
  song: null,
  annotation:{
    addingAnnotation: false,
    annotationHeight: null,
    highlightedText: null,
    showAnnotationText: false
  }
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
        searchResults: null
      }
    case "FOUND_SONGS":
      return{...state,
        searching: false,
        searchResults: action.payload,
        annotation:{}
      }
    case "ANNOTATING":
      return{
        ...state, annotation: {
          addingAnnotation: true,
          annotationHeight: action.payload.annotationHeight,
          highlightedText: action.payload.highlightedText,
          showAnnotationText: false
        }
      }
    case "SUBMIT_ANNOTATION":
      let annotatedLyrics = state.song.lyrics
      let selectedText = state.annotation.highlightedText.replace(/\n/g, "<br />")
      let wrappedText = `<a id=${action.payload.annotationId} onClick={}>` + selectedText + "</a>"
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
      return {
        ...state,
        annotation: {
          ...state.annotation,
          showAnnotationText: action.payload.annotation.annotation,
          annotationHeight: action.payload.height,
          addingAnnotation: false
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
    default:
      return {...state,
        annotation: {
          addingAnnotation: false,
          annotationHeight: null,
          highlightedText: null,
          showAnnotationText: false
        }
      };
  }
}
