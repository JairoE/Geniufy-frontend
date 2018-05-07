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
          annotationText: annotationText,
          jwt: localStorage.getItem('jwt')
        })
      })
      .then(res=>res.json())
      .then(json => {
        dispatch({type: "SUBMIT_ANNOTATION", payload: { annotationId: json.id }})
      })
  }
}

export function fetchSong(api_link){
  return (dispatch) => {
    dispatch({ type: "LOADING_SONG"});
    return fetch('http://localhost:3000/api/v1/songs',{
          method: "POST",
          headers: {
            Accept: 'application/json',
            'Content-Type': "application/json"
          },
          body: JSON.stringify({
            api_link: api_link,
          })
        })
        .then(res => res.json())
        .then(json => {
          dispatch({type: "LOAD_LYRICS", payload: json})
        });
  }
}

export function fetchInput(input){
  return (dispatch) => {
    dispatch({type: "SEARCHING_SONGS"});
    return fetch('http://localhost:3000/api/v1/fetchSongs',{
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': "application/json"
      },
      body: JSON.stringify({
        input: input,
      })
    })
    .then(res => res.json())
    .then(json => {
      dispatch({type: "FOUND_SONGS", payload: json})
    });
  }
}

export function fetchAnnotation(songId, annotationId, annotationHeight){
  return (dispatch) => {
    return fetch(`http://localhost:3000/api/v1/songs/${songId}/annotations/${annotationId}`)
          .then(res=>res.json())
          .then(json=>{
            dispatch({type: "SHOW_ANNOTATION", payload: { annotationAndUser: json, height: annotationHeight}})
          })
  }
}

export function spotifySignIn(code){
  return (dispatch) => {
    dispatch({type:"STARTING_SIGN_IN"})
    return fetch(`http://localhost:3000/api/v1/postLogin`,{
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': "application/json"
            },
            body: JSON.stringify({
              code: code,
            })
          })
            .then(res=>res.json())
            .then(json=>{
              localStorage.setItem("jwt", json.code)
              dispatch({type:"SPOTIFY_SIGN_IN", payload: json})
            })
  }
}

export function getPlaylists(){
  return (dispatch) => {
    return fetch("http://localhost:3000/api/v1/getPlaylists",{
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': "application/json"
      },
      body: JSON.stringify({
        jwt: localStorage.getItem('jwt'),
      })
    })
    .then(res=>res.json())
    .then(playlists=>{
      dispatch({type:"FETCHED_PLAYLISTS", payload: playlists})
    })
  }
}

export function getPlaylistTracks(playlist){
  return (dispatch) => {
    dispatch({type:"LOADING_TRACKS"})
    return fetch("http://localhost:3000/api/v1/getPlaylistTracks", {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': "application/json"
      },
      body: JSON.stringify({
        jwt: localStorage.getItem('jwt'),
        playlistHREF: playlist
      })
    })
    .then(res=>res.json())
    .then(playlist=>{
      dispatch({type:"GET_PLAYLIST_TRACKS", payload: playlist})
    })
  }
}

export function playTrack(trackId){
  return (dispatch) => {
    return fetch("http://localhost:3000/api/v1/playTrack",{
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': "application/json"
      },
      body: JSON.stringify({
        jwt: localStorage.getItem('jwt'),
        trackId: trackId
      })
    })
  }
}

export function playSongLyrics(song, artist){
  return (dispatch) => {
    dispatch({type: "LOADING_SONG"})
    return fetch("http://localhost:3000/api/v1/playSong",{
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': "application/json"
      },
      body: JSON.stringify({
        song: song,
        artist: artist
      })
    })
    .then(res=>res.json())
    .then(song => {
      dispatch({type:"LOAD_LYRICS", payload: song})
    })
  }
}

export let logout = () => {
  return({type:"LOGOUT"})
}
