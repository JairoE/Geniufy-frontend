import React from 'react'
import { Button, Segment, Card, Image, Grid } from 'semantic-ui-react'
import { bindActionCreators } from 'redux';
import { getPlaylists, getPlaylistTracks, switchTabs } from '../actions/actions.js'
import { connect } from 'react-redux'
import { ScaleLoader } from 'react-spinners';
import Playlist from './Playlist'
import '../css/playlists.css'


class PlaylistsContainer extends React.Component{

  getPlaylist = (event) => {
    this.props.dispatchSwitchTabs()
    this.props.dispatchGetPlaylistTracks(event.target.id)
  }

  showPlaylists = () => {
    return this.props.playlists.map((playlist)=>{
      let name = playlist.owner.display_name
      if(name === null){name = playlist.owner.id}
      return <Grid.Column>
          <Card centered={true}>
        <Image src={playlist.images[0].url} />
        <Card.Header textAlign={"center"}>
          {playlist.name}
        </Card.Header>
        <Card.Meta textAlign={"center"}>
          <span> Playlist created by {name}</span>
        </Card.Meta>
        <Button id={`${playlist.href}`} onClick={this.getPlaylist}>Play Playlist with Lyrics </Button>
      </Card>
      </Grid.Column>
    })
  }
  render(){
    return (
      <div id="playlists">
        <Segment.Group>
          <Segment padded>
            {this.props.playlists === null ? <Button color={"green"} onClick={this.props.dispatchGetPlaylists}>Get Playlists</Button> : null}
            {this.props.playlists !== null ? <Grid columns={3}> {this.showPlaylists()} </Grid> : null}
            {this.props.loadingtracks ? <ScaleLoader size={1000} /> : null}
          </Segment>
          {this.props.tracks !== null ? <Segment compact={true}> <Playlist /> </Segment>: null}
        </Segment.Group>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return{
    user: state.user,
    playlists: state.playlists,
    loadingtracks: state.loadingTracks,
    tracks: state.currentPlaylistTracks
  }
}

const mapDispatchToProps = dispatch => {
  return{
    dispatchGetPlaylists: bindActionCreators(getPlaylists, dispatch),
    dispatchGetPlaylistTracks: bindActionCreators(getPlaylistTracks, dispatch),
    dispatchSwitchTabs: () => dispatch(switchTabs())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(PlaylistsContainer)
