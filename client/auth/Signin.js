import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { signin } from '../auth/api-auth';
import { authenticate } from './auth-helper';
import { Button, Form, Grid, Header, Message, Segment, Modal } from 'semantic-ui-react';


class SignIn extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
      open: false,
      redirect: false,
      error: ''
    }
  }
  onCloseModal = () => {
    this.setState({ open: false })
  }

  handlerSubmit = name => event => {
    this.setState({ [name]: event.target.value })
  }



  clickSubmit = () => {

    const user = {
      email: this.state.email || undefined,
      password: this.state.password || undefined,
    }
    if (typeof user.email !== 'undefined' && typeof user.password !== 'undefined') {

      signin(user).then((data) => {

      if (data.name == "Error") {
          this.setState({ error: data.Message })
          this.setState({ open: true })

        }
        else {
          authenticate(data, () => {
            this.setState({ redirect: true })
          
          })
       }
      })


    }
  }

  render() {
    const { from } = this.props.location.state || {
      from: { pathname: '/dashboard' }
    }
    const { redirect } = this.state
    if (this.state.redirect) {
      console.log(redirect)
      return (<Redirect to={from} />)
    }

    return (

      <>
        <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h2' color='blue' textAlign='center'>
              Sign-in to your account
          </Header>
            <Form size='large'>
              <Segment stacked>
                <Form.Input fluid icon='user' iconPosition='left' placeholder='E-mail address' required onChange={this.handlerSubmit('email')} />
                <Form.Input
                  required
                  fluid
                  icon='lock'
                  iconPosition='left'
                  placeholder='Password'
                  type='password'
                  onChange={this.handlerSubmit('password')}
                />

                <Button color='blue' fluid size='large' onClick={this.clickSubmit}>
                  Sign in
              </Button>
              </Segment>
            </Form>
            <Message>
              Do not have an account? <Link to="/signup">Sign Up</Link>
            </Message>
          </Grid.Column>
        </Grid>


        <Modal size='mini' open={this.state.open}>
          <Modal.Header> Error </Modal.Header>
          <Modal.Content>
            <p> Oops!🤔 Check your email and password again.</p>
          </Modal.Content>
          <Modal.Actions>

            <Button
              negative
              onClick={this.onCloseModal}
            >Close</Button>

          </Modal.Actions>
        </Modal>
      </>
    )
  }
}

export default SignIn