import React from 'react'
import { fetchSong, fetchInput } from '../actions/actions.js'
import { connect } from 'react-redux'
import { Input, Loader, List, Grid, Image, Menu } from 'semantic-ui-react';
import { bindActionCreators } from 'redux';
import { RingLoader, BeatLoader, CircleLoader } from 'react-spinners';
import Lyrics from './Lyrics';
import "../css/searchpage.css"


class SearchBar extends React.Component{

  getSong = (event) => {
    event.preventDefault()
    let id = event.target.parentNode.id
    id === "" ? id = event.target.id : id = id
    this.props.dispatchFetchSong(id)
    document.getElementById('search-bar').value=""
  }

  fetchSongs = (event) =>{
    event.preventDefault()
    this.props.dispatchFetchInput(event.target.value)
  }

  loading(){
    return (
      <div>
          <Loader active inverted size="large">"Searching..."</Loader>
          <Image floated={"right"} src={require('../img/loading.png')}/>
      </div>
      )
  }

  showResults(){
    let songs = []
    for(let song = 0; song < this.props.searchResults.length; song++){
      songs.push(<List.Item onClick={this.getSong} id={this.props.searchResults[song].api_path} >
        <Image avatar src={this.props.searchResults[song].song_image} />
        <List.Content id={`${song+1}`}>
          {this.props.searchResults[song].full_song}
        </List.Content>
      </List.Item>)
    }
    return songs
  }

  render(){
    return(
      <div>
        <div id="search-container">
          <Input id="search-bar" fluid size={"large"} focus placeholder="Enter song or artist..." onChange={this.fetchSongs}/>
          {!this.props.selectedSong ? ( <div id="list-container">
            {this.props.searching ? <RingLoader size={400}/> : null}
            {this.props.searchResults === null ? null : <List selection animated verticalAlign='top' size={"big"}> {this.showResults()} </List>}
            </div>
          ): null}
          {this.props.selectedSong ? (this.props.song !== null ? <Lyrics /> : <CircleLoader size={400} />) : null}
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch =>{
  return({
    dispatchFetchSong: (api_link) => dispatch(fetchSong(api_link)),
    dispatchFetchInput: bindActionCreators(fetchInput, dispatch)
  })
}

const mapStateToProps = state => {
  return {
    user: state.user,
    searchResults: state.searchResults,
    searching: state.searching,
    selectedSong: state.selectedSong,
    song: state.song
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar)
