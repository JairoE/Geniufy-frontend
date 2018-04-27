export let searchHandler = (song, artist) => {
  return({
    type: "SEARCH_SONG",
    payload:{
      songName: song,
      artistName: artist
    }
  })
}

export let highlightHandler = (selectedObject, height) => {

  let typeString = "ALREADY_HIGHLIGHTED"
  if (selectedObject.toString().length > 0 && selectedObject.anchorNode.parentNode.nodeName !== "A"){
    typeString = "ANNOTATING"
  }
  return({
    type: typeString,
    payload:{
      highlightedText: selectedObject.toString(),
      annotationHeight: height
    }
  })
}

export function submitAnnotation(annotationText, songId){
  return (dispatch) => {
    return fetch(`http://localhost:3000/api/v1/songs/${songId}/annotations`, {
        method: "POST",
        headers: {
          Accept: 'application/json',
          'Content-Type': "application/json"
        },
        body: JSON.stringify({
          annotationText: annotationText
        })
      })
      .then(res=>res.json())
      .then(json => {
        dispatch({type: "SUBMIT_ANNOTATION", payload: { annotationId: json.id }})
      })
  }
}

export function fetchSong(searchInfo){
  return (dispatch) => {
    dispatch({ type: "LOADING_SONG"});
    return fetch('http://localhost:3000/api/v1/songs',{
          method: "POST",
          headers: {
            Accept: 'application/json',
            'Content-Type': "application/json"
          },
          body: JSON.stringify({
            song: searchInfo.songname,
            artist: searchInfo.artist
          })
        })
        .then(res => res.json())
        .then(json => dispatch({type: "LOAD_LYRICS", payload: json}));
  }
}

export function fetchAnnotation(songId, annotationId, annotationHeight){
  return (dispatch) => {
    return fetch(`http://localhost:3000/api/v1/songs/${songId}/annotations/${annotationId}`)
          .then(res=>res.json())
          .then(json=>{
            dispatch({type: "SHOW_ANNOTATION", payload: { annotation: json, height: annotationHeight}})
          })
  }
}
