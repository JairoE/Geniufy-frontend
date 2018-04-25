import React from 'react'
import renderHTML from 'react-render-html';
import '../css/lyrics.css'

export default class Lyrics extends React.Component{
  state = {
    lyrics: false
  }

  componentDidMount(){
    fetch('http://localhost:3000/api/v1/songs',{
      method: "POST",
      headers: {
        Accept: 'application/json',
        'Content-Type': "application/json"
      },
      body: JSON.stringify({
        song: this.props.song.songname,
        artist: this.props.song.artist
      })
    })
    .then(res => res.json())
    .then(json => {
      this.setState({
        lyrics: json.lyrics,
        song: json
      })
    })
  }

  // closure used to keep track of annotations
  highlightHandler = (event) => {
    if (window.getSelection().toString().length > 0 && window.getSelection().anchorNode.parentNode.nodeName !== "A"){
      let annotatedLyrics = this.state.lyrics
      let selectedText = window.getSelection().toString().replace(/\n/g, "<br />")
      let wrappedText = `<a>` + selectedText + "</a>"

      annotatedLyrics = annotatedLyrics.replace(selectedText, wrappedText)
      this.setState({
        lyrics: annotatedLyrics
      })
      this.updateSongAnnotations(annotatedLyrics)
    }
  }

  updateSongAnnotations = (newlyrics) => {
    fetch(`http://localhost:3000/api/v1/songs/${this.state.song.id}`,{
      method: "PATCH",
      headers: {
        Accept: 'application/json',
        'Content-Type': "application/json"
      },
      body: JSON.stringify({
        lyrics: newlyrics
      })
    })
  }

  render(){
    return(
      <div id="lyrics-container" onMouseUp={this.highlightHandler}>
      {this.state.lyrics ? <h2> {this.state.song.name} by {this.state.song.artist} </h2> : null}
      {this.state.lyrics ? renderHTML("<div id='lyrics'>" + this.state.lyrics + "</div>") : <div> Searching... </div>}
      </div>
    )
  }
}
