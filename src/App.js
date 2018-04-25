import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Search from './components/Search'
import Lyrics from './components/Lyrics'

class App extends Component {
  state = {
    search: false,
    song: null
  }

  searchHandler = (event) =>{
    event.preventDefault()
    let info = {songname: event.target.children[0].value, artist: event.target.children[2].value}
    this.setState({
      search: true,
      song: info
    })
  }

  render() {

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Nonchalant</h1>
        </header>
        {!this.state.search ? <Search searchHandler={this.searchHandler} /> : null}
        {this.state.search ? <Lyrics song={this.state.song} /> : null}
      </div>
    );
  }
}

export default App;
