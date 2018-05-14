import React from 'react';
import { Comment, Segment, Form, Button} from 'semantic-ui-react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { chainAnnotation } from '../actions/actions.js'

class ShowAnnotation extends React.Component {

  createChain = (event) => {
    let text = event.target.children[0].children[0].value
    this.props.dispatchAnnotationChain(this.props.songId, this.props.annotations[0].annotation.id, text)
  }

  generateForm = () => {
    return(
      <Form onSubmit={this.createChain}>
        <Form.TextArea placeholder="Enter your reply/annotation here!"/>
        <Button content='Add/Reply to the Annotation!' labelPosition='left' icon='edit' primary />
      </Form>
    )
  }

  showAnnotations = () => {
    let annotations = this.props.annotations.map((annotationObj) => {
              return(
              <Comment>
                <Comment.Avatar src={require('../img/userIcon.jpg')} />
                <Comment.Content>
                  <Comment.Author as="p">{annotationObj.username}</Comment.Author>
                  <Comment.Text> <p>{annotationObj.annotation.annotation}</p> </Comment.Text>
                </Comment.Content>
              </Comment>
            )
            })
    if (this.props.annotations[this.props.annotations.length - 1].username !== this.props.username){
      annotations.push(this.generateForm())
      return annotations
    }else{
      return annotations
    }
  }

  render(){
    return(
      <Segment style={{top: `${this.props.annotationHeight - this.props.subtractHeight}px`}}>
        <Comment.Group>
          {this.showAnnotations()}
        </Comment.Group>
      </Segment>
    )
  }
}

const mapStateToProps = state => {
  return {
    username: state.user.username,
    songId: state.song.id,
    annotations: state.annotation.showAnnotation,
    annotationHeight: state.annotation.annotationHeight
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchAnnotationChain: bindActionCreators(chainAnnotation, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowAnnotation);
