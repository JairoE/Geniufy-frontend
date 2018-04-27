import React from 'react';
import { Button} from 'semantic-ui-react';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';

const ShowAnnotation = props => {

  return(
    <div>
      {props.annotationText}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    annotationText: state.annotation.showAnnotationText
  }
}

export default connect(mapStateToProps)(ShowAnnotation);
