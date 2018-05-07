import React from 'react';
import { Comment, Segment} from 'semantic-ui-react';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';

const ShowAnnotation = props => {

  return(
    <Segment style={{top: `${props.annotationHeight-140}px`}}>
      <Comment.Group>
        <Comment>
          <Comment.Avatar src={require('../img/userIcon.jpg')} />
          <Comment.Content>
            <Comment.Author as="p">{props.annotationUser}</Comment.Author>
            <Comment.Text> <p>{props.annotationText}</p> </Comment.Text>
          </Comment.Content>
        </Comment>
      </Comment.Group>
    </Segment>
  )
}

const mapStateToProps = state => {
  return {
    annotationText: state.annotation.showAnnotation.annotation.annotation,
    annotationUser: state.annotation.showAnnotation.username,
    annotationHeight: state.annotation.annotationHeight
  }
}

export default connect(mapStateToProps)(ShowAnnotation);
