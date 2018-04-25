import React from 'react'

export default class Search extends React.Component{

  render(){
    return(
      <form onSubmit={this.props.searchHandler}>
        <input placeholder="Enter song name"/>
        <br />
        <input placeholder="Enter artist name"/>
        <br />
        <button type="submit"> Search </button>
      </form>
    )
  }
}
