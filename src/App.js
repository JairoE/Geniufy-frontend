import React, { Component } from 'react';
import './App.css';
import MenuBar from './components/MenuBar';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import {Route, Switch, withRouter} from 'react-router-dom';
import { spotifySignIn } from './actions/actions.js'
import Script from 'react-load-script'

class App extends Component {
  componentDidMount(){
    if(this.props.location.search === ""){
      this.props.history.push('/')
    }else{
      this.props.dispatchSpotifySignIn(this.props.location.search.slice(6))
      this.props.history.push('/home')
    }
  }

  componentDidUpdate(){
    if(this.props.signedIn === false){
      this.props.history.push('/')
    }
  }

  handleScriptLoad = () => {
    window.onSpotifyWebPlaybackSDKReady = () => {
      console.log("The Web Playback SDK is ready. We have access to Spotify.Player");
      console.log(window.Spotify.Player);
      const token = localStorage.getItem("spot");
      const player = new window.Spotify.Player({
      name: 'Music Player',
      getOAuthToken: cb => { cb(token); }
      });

      // Error handling
      player.addListener('initialization_error', ({ message }) => { console.error(message); });
      player.addListener('authentication_error', ({ message }) => { console.error(message); });
      player.addListener('account_error', ({ message }) => { console.error(message); });
      player.addListener('playback_error', ({ message }) => { console.error(message); });

      // Playback status updates
      player.addListener('player_state_changed', state => { console.log(state); });

      // Ready
      player.addListener('ready', ({ device_id }) => {
      console.log('Ready with Device ID', device_id);
      });

      // Not Ready
      player.addListener('not_ready', ({ device_id }) => {
      console.log('Device ID has gone offline', device_id);
      });
      // Connect to the player!
      player.connect().then(success => {
        if (success){
          console.log("Successfully connected")
        }
      });
    }
  }

  render() {
    return (
      <div className="App">
        <MenuBar />
        {this.props.user !== null ? <Script url="https://sdk.scdn.co/spotify-player.js" onError={()=>{console.log("error")}} onLoad={this.handleScriptLoad} /> : null }
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return({
    dispatchSpotifySignIn: bindActionCreators(spotifySignIn, dispatch)
  })
}

const mapStateToProps = state => {
  return{
    signedIn: state.signedIn,
    user: state.user,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
