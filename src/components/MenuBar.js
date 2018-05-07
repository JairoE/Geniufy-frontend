import React from 'react'
import { fetchSong, fetchInput, logout } from '../actions/actions.js'
import { connect } from 'react-redux'
import { Input, Loader, List, Grid, Image, Menu } from 'semantic-ui-react';
import { bindActionCreators } from 'redux';
import { RingLoader, BeatLoader } from 'react-spinners';
import UserHomePage from './UserHomePage'
import SearchPage from './SearchPage'
import PlaylistsContainer from './PlaylistsContainer'
import { Route, withRouter } from 'react-router-dom';


class MenuBar extends React.Component{
  state = {
    activeItem: "Home"
  }

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

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })
  // <Menu.Item position="right">
  // <Input size={"large"} focus placeholder="Enter song or artist..." onChange={this.fetchSongs}/>
  // </Menu.Item>
  render(){
    return(
      <div>
        <Menu pointing secondary color={"blue"}>
          <Menu.Item>
            Hello, {this.props.user !== null ? this.props.user.username : <BeatLoader />}
          </Menu.Item>
          <Menu.Item>
            Geniufy
          </Menu.Item>
          <Menu.Menu position="right">
            <Menu.Item name="Home" active={this.state.activeItem === "Home"} onClick={this.handleItemClick} />
            <Menu.Item name="Search" active={this.state.activeItem === "Search"} onClick={this.handleItemClick} />
            <Menu.Item name="Your Playlists" active={this.state.activeItem === "Your Playlists"} onClick={this.handleItemClick} />
            <Menu.Item name="Logout" active={this.state.activeItem === "Logout"} onClick={this.props.dispatchLogout} />
          </Menu.Menu>
        </Menu>
        {this.state.activeItem === "Home" ?  <UserHomePage />: null}
        {this.state.activeItem === "Search" ? <SearchPage /> : null}
        {this.state.activeItem === "Your Playlists" ? <PlaylistsContainer /> : null}
      </div>
    )
  }
}

const mapDispatchToProps = dispatch =>{
  return({
    dispatchFetchSong: (api_link) => dispatch(fetchSong(api_link)),
    dispatchFetchInput: bindActionCreators(fetchInput, dispatch),
    dispatchLogout: ()=> dispatch(logout())
  })
}

const mapStateToProps = state => {
  return {
    user: state.user,
    searchResults: state.searchResults,
    searching: state.searching,
    selectedSong: state.selectedSong
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuBar)
