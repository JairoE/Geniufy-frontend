import React from 'react'
import { bindActionCreators } from 'redux';
import { getPlaylists } from '../actions/actions.js'
import { connect } from 'react-redux'


class UserHomePage extends React.Component{

  render(){
    return(
      <div id="titles"><div id="titlecontent">
        {this.props.user !==null ? <p> Hello {this.props.user.username}! Welcome to Geniufy, the combination of two apps that I definitely did NOT use the help of to build this. I hope you have a spotify premium account so that you can hear music from this webpage. Click the search tab to search the lyrics for any song you desire! If you have created spotify playlists, click the Your Playlists tab to retrieve your playlists. There, you can cilck the songs that you wish to listen to while reading and annotating the lyrics! Leave any annotations your heart desires! *Spotify plz hire me*</p> : null}
      </div></div>
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
