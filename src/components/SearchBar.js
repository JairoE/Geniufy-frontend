import React from 'react'
import { searchHandler } from '../actions/actions.js'
import { connect } from 'react-redux'
import { Form, Button, Input } from 'semantic-ui-react';

class SearchBar extends React.Component{
  state={
    song: "",
    artist: ""
  }
  getSongName = (event) => {
    event.preventDefault()
    this.props.dispatchSearchHandler(this.state.song, this.state.artist)
  }

  updateSongInput = (event) =>{
    this.setState({
      song: event.target.value
    })
  }

  updateArtistInput = (event) =>{
    this.setState({
      artist: event.target.value
    })
  }

  render(){
    return(
      <Form onSubmit={this.getSongName}>
        <Input placeholder="Enter song name" onChange={this.updateSongInput}/>
        <br />
        <Input placeholder="Enter artist name" onChange={this.updateArtistInput}/>
        <br />
        <Button type="submit"> Search </Button>
      </Form>
    )
  }
}

const mapDispatchToProps = dispatch =>{
  return({
    dispatchSearchHandler: (song,artist) => dispatch(searchHandler(song,artist))
  })
}

export default connect(null, mapDispatchToProps)(SearchBar)
