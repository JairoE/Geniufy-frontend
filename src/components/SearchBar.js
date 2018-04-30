import React from 'react'
import { fetchSong, fetchInput } from '../actions/actions.js'
import { connect } from 'react-redux'
import { Form, Button, Input, Segment, Loader, List, Grid, Image, Menu } from 'semantic-ui-react';
import { bindActionCreators } from 'redux';
import { RingLoader } from 'react-spinners'
import Login from './Login.js'



class SearchBar extends React.Component{

  getSong = (event) => {
    event.preventDefault()
    console.log(event.target.parentNode.id)
    this.props.dispatchFetchSong(event.target.parentNode.id)
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
      songs.push(<List.Item size={"medium"} onClick={this.getSong} id={this.props.searchResults[song].api_path} >
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
        <Menu>
          <Menu.Item>
            <Login />
          </Menu.Item>
          <Menu.Item>
            Geniufy
          </Menu.Item>
          <Menu.Item position="right">
            <Input size={"large"} focus placeholder="Enter song or artist..." onChange={this.fetchSongs}/>
          </Menu.Item>
        </Menu>
        {!this.props.selectedSong ? (
          <Grid columns={2}>
            <Grid.Column floated={"right"} textAlign={"right"}>
              {this.props.searching ? <RingLoader /> : null }
              {this.props.searchResults === null ? null : <List selection animated verticalAlign='middle'> {this.showResults()} </List> }
            </Grid.Column>
          </Grid>
        ): null}
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
    searchResults: state.searchResults,
    searching: state.searching,
    selectedSong: state.selectedSong
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar)
