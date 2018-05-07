import React from 'react'
import renderHTML from 'react-render-html';
import { highlightHandler, fetchAnnotation} from '../actions/actions.js'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { Segment, Header, Grid} from 'semantic-ui-react'
import '../css/lyrics.css'
import AnnotationForm from './AnnotationForm';
import ShowAnnotation from './showAnnotation';

class Lyrics extends React.Component{

  highlightHandler = (event) => {
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
    let Lyrics = React.cloneElement(lyrics, lyrics.props, newtags)

    return (<div id="lyrics-container" onMouseUp={this.highlightHandler}>
              <Header as="h3" attached='top'>
              {this.props.song.name} by {this.props.song.artist}
              </Header>
              <Segment attached style={{overflow: 'auto', maxHeight: 850 }}>{Lyrics}</Segment>
              </div>
          )
  }

  render(){

    return(<Grid columns={3} id="lyrics-grid">
        <Grid.Column width={10} textAlign={"center"}>
          {this.generateLyrics()}
        </Grid.Column>
        <Grid.Column width={4}>
        <div id="right-column-container">
          {this.props.addingAnnotation ? <AnnotationForm />: null}
          {this.props.showAnnotation ? <ShowAnnotation /> : null}
        </div>
        </Grid.Column>
      </Grid>
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
    song: state.song,
    addingAnnotation: state.annotation.addingAnnotation,
    showAnnotation: state.annotation.showAnnotation
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Lyrics)
