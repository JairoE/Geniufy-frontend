import React from 'react'
import renderHTML from 'react-render-html';
import { highlightHandler, fetchSong, fetchAnnotation} from '../actions/actions.js'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { Dimmer, Loader, Segment} from 'semantic-ui-react'
import '../css/lyrics.css'

class Lyrics extends React.Component{
  componentDidMount(){
    this.props.dispatchFetchSong(this.props.searchInfo)
  }

  highlightHandler = (event) => {
    this.props.dispatchHighlightHandler(window.getSelection(), event.pageY)
  }

  fetchAnnotation = (event) => {
    this.props.dispatchFetchAnnotation(this.props.song.songObj.id, event.target.id, event.pageY)
  }

  generateLyrics(){
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
    return React.cloneElement(lyrics, lyrics.props, newtags)
  }

  loading(){
    return (<Segment>
        <Loader active inverted size="massive">"Loading Song:)"</Loader>
      </Segment>)
  }

  render(){
    let Lyrics
    if(this.props.song.songObj !== null){
      Lyrics = this.generateLyrics()
    }
    return(
      <div id="lyrics-container" onMouseUp={this.highlightHandler}>
      {this.props.song.loading ? <h2> {this.props.searchInfo.songname} by {this.props.searchInfo.artist} </h2> : null}
      {this.props.song.songObj !== null ? <Segment>{Lyrics}</Segment> : this.loading()}

      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return({
    dispatchHighlightHandler: (selectedObject, height) => dispatch(highlightHandler(selectedObject, height)),
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
