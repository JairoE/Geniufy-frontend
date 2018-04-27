const defaultState = {
  user: null,
  searchInfo: false,
  song: {
    loading: false,
    songObj: null
  },
  annotation:{
    addingAnnotation: false,
    highlightedText: null,
    showAnnotationText: false
  }
}



export default function rootReducer(state = defaultState, action) {
  switch(action.type) {
    case "SEARCH_SONG":
      let info = {songname: action.payload.songName, artist: action.payload.artistName}
      return{
        ...state, searchInfo: info
      }
    case "ANNOTATING":
      return{
        ...state, annotation: {
          addingAnnotation: true,
          highlightedText: action.payload.highlightedText
        }
      }
    case "SUBMIT_ANNOTATION":
      let annotatedLyrics = state.song.songObj.lyrics
      let selectedText = state.annotation.highlightedText.replace(/\n/g, "<br />")
      let wrappedText = `<a id=${action.payload.annotationId} onClick={this.fetchAnnotation}>` + selectedText + "</a>"
      let reg = new RegExp(selectedText, "g")
      annotatedLyrics = annotatedLyrics.replace(reg, wrappedText)
      fetch(`http://localhost:3000/api/v1/songs/${state.song.songObj.id}`,{
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
        song: {
          loading: true,
          songObj: {...state.song.songObj,
            lyrics: annotatedLyrics
          },
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
          showAnnotationText: action.payload.annotation
        }
      }
    case "LOADING_SONG":
      return{...state,
        song: {
          loading: true,
          songObj: null
        }
      }
    case "LOAD_LYRICS":
      return{...state,
        song: {
          loading: true,
          songObj: action.payload
        }
      }
    default:
      return state;
  }
}
