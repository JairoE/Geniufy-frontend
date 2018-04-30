import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SearchBar from './components/SearchBar';
import Lyrics from './components/Lyrics';
import { connect } from 'react-redux';
import { Grid, Segment, Button, Divider } from 'semantic-ui-react';
import AnnotationForm from './components/AnnotationForm';
import ShowAnnotation from './components/showAnnotation';
import Login from './components/Login.js';
import {Route} from 'react-router-dom';

class App extends Component {

  showLyrics(){
    return(<Grid columns={3} id="lyrics-grid">
      <Grid.Column width={10} textAlign={"center"}>
        {this.props.selectedSong ? <Lyrics /> : null}
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

  Home = () => {
    return(
      <div className="App">
        <SearchBar />
        {this.props.selectedSong ? this.showLyrics() : null}
      </div>
    )
  }

  Login = () => {
    return (
      <div id="login">
      <Segment padded>
        <Button fluid href="http://localhost:3000/api/v1/login">Spotify Login</Button>
        <Divider horizontal>Or</Divider>
        <Button fluid>Guest</Button>
      </Segment>
      </div>
    )
  }

  render() {

    return (
      <div>
      <Route exact path='/' component={this.Login} />
      <Route path='/home' component={this.Home} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return{
    selectedSong: state.selectedSong,
    addingAnnotation: state.annotation.addingAnnotation,
    showAnnotation: state.annotation.showAnnotationText
  }
}

export default connect(mapStateToProps)(App);
