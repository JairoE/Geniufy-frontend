import React from 'react'
import { bindActionCreators } from 'redux';
import { getPlaylists } from '../actions/actions.js'
import { connect } from 'react-redux'


class UserHomePage extends React.Component{

  render(){
    return(
      <div id="titles">
        
      </div>
  )
  }
}

const mapStateToProps = state => {
  return{
    user: state.user,
    playlists: state.playlists
  }
}

const mapDispatchToProps = dispatch => {
  return{
    dispatchGetPlaylists: bindActionCreators(getPlaylists, dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(UserHomePage)
