import React from 'react'
import { List, Image, Grid, Segment, Button, Icon} from 'semantic-ui-react'
import { bindActionCreators } from 'redux';
import { getPlaylists, playTrack, playSongLyrics } from '../actions/actions.js'
import { connect } from 'react-redux'
import { CircleLoader } from 'react-spinners';
import Lyrics from './Lyrics'
import LyricsNotFound from './LyricsNotFound'
import '../css/playlists.css'


class Playlist extends React.Component {
  playTrack = (event) => {
    let id = event.target.parentNode.id
    if(id === ""){id = event.target.id}
    this.props.dispatchPlayTrack(id)
    if(event.target.className==="content"){
      let search = event.target.textContent
      let by = search.indexOf("by")
      let song = search.substring(0,by-1)
      let artist = search.substring(by+3)
      this.props.dispatchPlaySongLyrics(song, artist)
    }
  }

  showTracks = () =>{
    return this.props.tracks.map((track)=>{
      return (<List.Item>
        <Image avatar src={track.image} />
        <List.Content id={track.uri} onClick={this.playTrack}>
          {track.name} by {track.artist}
        </List.Content>
      </List.Item>
    )
    })
  }

  prevSong = () =>{

  }

  nextSong = () => {

  }

  play = () => {
    fetch('http://localhost:3000/api/v1/play',{
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': "application/json"
      },
      body: JSON.stringify({
        jwt: localStorage.getItem('jwt'),
      })
    })
  }

  pause = () => {
    fetch('http://localhost:3000/api/v1/pause',{
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': "application/json"
      },
      body: JSON.stringify({
        jwt: localStorage.getItem('jwt'),
      })
    })
  }

  render(){
    console.log(this.props.song)
    return (
      <Grid columns={2}>
      <Grid.Column width={4}>
        <Segment className="seg3Color" style={{overflow: 'auto', maxHeight: 900 }}>
        <Button.Group icon fluid>
        <Button onClick={this.prevSong}>
          <Icon name='step backward' />
        </Button>
        <Button onClick={this.play}>
          <Icon name='play' />
        </Button>
        <Button onClick={this.pause}>
          <Icon name='pause' />
        </Button>
        <Button onClick={this.nextSong}>
          <Icon name='step forward' />
        </Button>
      </Button.Group>
        <List celled animated verticalAlign={"middle"}>
          {this.showTracks()}
        </List>
        </Segment>
      </Grid.Column>
      <Grid.Column width={12}>
        {this.props.selectedSong ? (this.props.song !== null ? (this.props.song.status === undefined ? <Lyrics height={180}/>: <LyricsNotFound />) : <CircleLoader color={"#1e7aca"} size={600} />) : null}
      </Grid.Column>
      </Grid>
    )
  }
}

const mapStateToProps = state => {
  return{
    tracks: state.currentPlaylistTracks,
    song: state.song,
    selectedSong: state.selectedSong
  }
}

const mapDispatchToProps = dispatch => {
  return{
    dispatchGetPlaylists: bindActionCreators(getPlaylists, dispatch),
    dispatchPlayTrack: bindActionCreators(playTrack, dispatch),
    dispatchPlaySongLyrics: bindActionCreators(playSongLyrics, dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Playlist)
