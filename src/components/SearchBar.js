import React from 'react'
import { searchHandler } from '../actions/actions.js'
import { connect } from 'react-redux'

const SearchBar = (props) => {
  const getSongName = (event) => {
    event.preventDefault()
    props.dispatchSearchHandler(event.target)
  }

  return(
    <form onSubmit={getSongName}>
      <input placeholder="Enter song name"/>
      <br />
      <input placeholder="Enter artist name"/>
      <br />
      <button type="submit"> Search </button>
    </form>
  )
}

const mapDispatchToProps = dispatch =>{
  return({
    dispatchSearchHandler: form => dispatch(searchHandler(form))
  })
}

export default connect(null, mapDispatchToProps)(SearchBar)
