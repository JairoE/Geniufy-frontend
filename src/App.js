import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SearchBar from './components/SearchBar'
import Lyrics from './components/Lyrics'
import { connect } from 'react-redux'
import { Grid, Segment, Divider} from 'semantic-ui-react'
import AnnotationForm from './components/AnnotationForm'
import ShowAnnotation from './components/showAnnotation'

class App extends Component {
  // state = {
  //   search: false,
  //   song: null
  // }

  // searchHandler = (event) =>{
  //   event.preventDefault()
  //   let info = {songname: event.target.children[0].value, artist: event.target.children[2].value}
  //   this.setState({
  //     search: true,
  //     song: info
  //   })
  // }

  render() {

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Nonchalant</h1>
        </header>
        {!this.props.searchInfo ? <SearchBar /> : null}
        <Grid columns={2}>
          <Grid.Column width={10}>
            {this.props.searchInfo ? <Lyrics /> : null}
          </Grid.Column>
          <Grid.Column width={6}>
            {this.props.addingAnnotation ? <AnnotationForm /> : null}
            {this.props.showAnnotation ? <ShowAnnotation /> : null}
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return{
    searchInfo: state.searchInfo,
    addingAnnotation: state.annotation.addingAnnotation,
    showAnnotation: state.annotation.showAnnotationText
  }
}

export default connect(mapStateToProps)(App);
