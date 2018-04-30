import React from 'react'
import renderHTML from 'react-render-html';
import { highlightHandler, fetchAnnotation} from '../actions/actions.js'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { Dimmer, Loader, Segment, Image, Header} from 'semantic-ui-react'
import '../css/lyrics.css'
import { CircleLoader } from 'react-spinners'

class Lyrics extends React.Component{

  highlightHandler = (event) => {
    console.log(window.getSelection().toString())
    this.props.dispatchHighlightHandler(window.getSelection(), event.pageY)
  }

  fetchAnnotation = (event) => {
    this.props.dispatchFetchAnnotation(this.props.song.id, event.target.id, event.pageY)
  }

  generateLyrics(){
    let lyrics = renderHTML("<div id='lyrics'>" + this.props.song.lyrics + "</div>")
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
    return (
      <div>
        <Loader active inverted size="small">"Searching..."</Loader>
        <Image floated={"left"} src={require('../img/loading.png')}/>
      </div>
      )
  }

  render(){
    let Lyrics = "loading"
    if(this.props.song !== null){
      Lyrics = this.generateLyrics()
    }
    return(
      <div id="lyrics-container" onMouseUp={this.highlightHandler}>
      {this.props.song !== null
        ? ( <div>
            <Header as="h3" attached='top'>
            {this.props.song.name} by {this.props.song.artist}
            </Header>
            <Segment attached>{Lyrics}</Segment>
            </div>
          )
        : <CircleLoader />}

      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return({
    dispatchHighlightHandler: (selectedObject, height) => dispatch(highlightHandler(selectedObject, height)),
    dispatchFetchAnnotation: bindActionCreators(fetchAnnotation, dispatch)
  })
}

const mapStateToProps = state => {
  return{
    selectedSong: state.selectedSong,
    song: state.song
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Lyrics)
