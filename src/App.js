import React, { Component } from 'react';
import './App.css';
import MenuBar from './components/MenuBar';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {Route, Switch, withRouter} from 'react-router-dom';
import { spotifySignIn } from './actions/actions.js'
import UserHomePage from './components/UserHomePage'

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

  render() {
    return (
      <div className="App">
        <MenuBar />
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
    selectedSong: state.selectedSong,
    addingAnnotation: state.annotation.addingAnnotation,
    showAnnotation: state.annotation.showAnnotation,
    searching: state.searching
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
