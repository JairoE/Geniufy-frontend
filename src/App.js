import React, { Component } from 'react';
import logo from './logo.svg';
import renderHTML from 'react-render-html';
import './App.css';

class App extends Component {
  state = {
    song: false
  }
  componentDidMount(){
    fetch('http://localhost:3000/api/v1/songs',{
      method: "POST",
      headers: {
        Accept: 'application/json',
        'Content-Type': "application/json"
      },
      body: JSON.stringify({
        song: "The end",
        artist: "the doors"
      })
    })
    .then(res => res.json())
    .then(json => {
      this.setState({
        song: json
      })
    })
  }

  render() {

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        {this.state.song ? renderHTML("<div id='lyrics'>" + this.state.song.lyrics + "</div>") : null}
      </div>
    );
  }
}

export default App;
