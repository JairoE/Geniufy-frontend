import React from 'react'
import { List, Image, Icon, Grid, Segment} from 'semantic-ui-react'
import { bindActionCreators } from 'redux';
import { getPlaylists, playTrack, playSongLyrics } from '../actions/actions.js'
import { connect } from 'react-redux'
import { CircleLoader } from 'react-spinners';
import SpotifyPlayer from 'react-spotify-player'
import Lyrics from './Lyrics'
import '../css/playlists.css'


class Playlist extends React.Component {
  playTrack = (event) => {
    let id = event.target.parentNode.id
    id === "" ? id = event.target.id : id = id
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

  render(){
    return (
      <Grid columns={2}>
      <Grid.Column width={4}>
        <Segment style={{overflow: 'auto', maxHeight: 900 }}>
        <List animated verticalAlign={"middle"}>
          {this.showTracks()}
        </List>
        </Segment>
      </Grid.Column>
      <Grid.Column width={12}>
        {this.props.selectedSong ? (this.props.song !== null ? <Lyrics /> : <CircleLoader size={400} />) : null}
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
