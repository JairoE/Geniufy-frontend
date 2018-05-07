import React from 'react'
import { Button, Segment, Divider } from 'semantic-ui-react'
import { bindActionCreators } from 'redux';
import { getPlaylists } from '../actions/actions.js'
import { connect } from 'react-redux'
import SpotifyPlayer from 'react-spotify-player'


class UserHomePage extends React.Component{

  render(){
    return(
      <Segment padded>
        Hello
      </Segment>
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
