import React from 'react'
import renderHTML from 'react-render-html';
import { highlightHandler, fetchSong, fetchAnnotation} from '../actions/actions.js'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import '../css/lyrics.css'

class Lyrics extends React.Component{
  componentDidMount(){
    this.props.dispatchFetchSong(this.props.searchInfo)
  }

  highlightHandler = () => {
    this.props.dispatchHighlightHandler(window.getSelection())
  }

  fetchAnnotation = (event) => {
    this.props.dispatchFetchAnnotation(this.props.song.songObj.id, event.target.id)
  }
  render(){
    let newLyrics = null
    if(this.props.song.songObj !== null){
    let lyrics = renderHTML("<div id='lyrics'>" + this.props.song.songObj.lyrics + "</div>")
    let newtags = lyrics.props.children.map((tag) => {
      if(tag.type === "a"){

        let newtag = {id:tag.props.id, onClick: this.fetchAnnotation}
        let clonetag = React.cloneElement(tag, newtag, tag.props.children)
        return clonetag
      }else{
        return tag
      }
    })
    newLyrics = React.cloneElement(lyrics, lyrics.props, newtags)
    // newLyrics.props.children = newtags
    }

    return(
      <div id="lyrics-container" onMouseUp={this.highlightHandler}>
      {this.props.song.loading ? <h2> {this.props.searchInfo.songname} by {this.props.searchInfo.artist} </h2> : null}
      {this.props.song.songObj !== null ? newLyrics : <div> Searching... </div>}
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return({
    dispatchHighlightHandler: selectedObject => dispatch(highlightHandler(selectedObject)),
    dispatchFetchSong: bindActionCreators(fetchSong, dispatch),
    dispatchFetchAnnotation: bindActionCreators(fetchAnnotation, dispatch)
  })
}

const mapStateToProps = state => {
  return{
    searchInfo: state.searchInfo,
    song: state.song
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Lyrics)
