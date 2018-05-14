import React from 'react'
import { Button, Segment } from 'semantic-ui-react'
import '../css/login.css'

const Login = (props) => {
  return (
    <div>
      <div id="Geniufy">
        <h1>GENIUFY</h1>
      </div>
      <div id="login">
        <Button color={"green"} fluid href="http://localhost:3000/api/v1/login">Login with Spotify</Button>
      </div>
    </div>
  )
}

export default Login
