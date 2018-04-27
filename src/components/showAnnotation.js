import React from 'react';
import { Button, Comment, Form, Segment} from 'semantic-ui-react';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';

const ShowAnnotation = props => {

  return(
    <Segment style={{top: `${props.annotationHeight-160}px`}}>
      <Comment.Group>
        <Comment>
          <Comment.Avatar src={require('../img/userIcon.jpg')} />
          <Comment.Content>
            <Comment.Author as="p">Jairo</Comment.Author>
            <Comment.Text> <p>{props.annotationText}</p> </Comment.Text>
          </Comment.Content>
        </Comment>
      </Comment.Group>
    </Segment>
  )
}

const mapStateToProps = state => {
  return {
    annotationText: state.annotation.showAnnotationText,
    annotationHeight: state.annotation.annotationHeight
  }
}

export default connect(mapStateToProps)(ShowAnnotation);
