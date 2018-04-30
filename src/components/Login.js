import React from 'react'
import { Button } from 'semantic-ui-react'

const Login = (props) => {
  return(
    <Button.Group>
      <Button href="http://localhost:3000/api/v1/login"> LogIn </Button>
      <Button.Or />
      <Button> Guest </Button>
    </Button.Group>
  )
}

export default Login
