import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { Segment, Responsive, Button, Icon, Table, Container } from 'semantic-ui-react';
import MenuUI from './Menu';
import {isAuthenticated} from '../auth/auth-helper';
import axios from 'axios';

//__test__
import { Projects } from '../__test__/projects.json.json'
export default class Dashboard extends Component {
  constructor() {
    super()
    this.state = ({
      open: true,
      error: [],
      repos: []
    })
   
}

getLanguageIcon(language) {

let lan = {
  "JavaScript" : 'js',
  "PHP": 'php',
  "Python": 'python',
}
  return lan[language];
}

componentDidMount() {
      axios.get(`https://api.github.com/users/${isAuthenticated().user.github_name}/repos`)
        .then((repos) => {
            this.setState({repos: repos.data})
      })
      .catch((err) => {
          this.setState({error: err})
          console.log(this.state.error)
      })
  }

  goContent(path) {
    return <Link to={path}/>
  }

  render() {

    return (
      <div>
        <MenuUI />
        <Container className='containerDashboard' style={{ marginTop: '30px' }} >
          <Table celled compact definition>
            <Table.Header fullWidth>
              <Table.Row>
                <Table.HeaderCell />
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Description</Table.HeaderCell>
                <Table.HeaderCell>Languaje</Table.HeaderCell>
                <Table.HeaderCell>GitHub repository</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {this.state.repos.map(repos =>
                <Table.Row key={repos.id}>
                  <Table.Cell collapsing>
                    
         <Link to={`/content/repo/${isAuthenticated().user.github_name}/`  + repos.name}><Button size='small'>Detail</Button></Link>
                  </Table.Cell>
              <Table.Cell>{repos.name} {repos.fork ? (<Icon name='fork'/>) : (<></>) }</Table.Cell>
                  <Table.Cell>{repos.description}</Table.Cell>
              <Table.Cell>{repos.language}<Icon name={`${this.getLanguageIcon(repos.language)}`}/></Table.Cell>
                  <Table.Cell><a href={repos.html_url} target='_blank'>{repos.html_url}</a></Table.Cell>
                </Table.Row>
              )}

            </Table.Body>

              {this.state.error ? (<><h4>Check you GitHub Name</h4></>) : (<>
              <Table.Body>
              {this.state.repos.map(repos =>
                <Table.Row key={repos.id}>
                  <Table.Cell collapsing>
                    <Button size='small'>Detail</Button>
                  </Table.Cell>
              <Table.Cell>{repos.name} {repos.fork ? (<Icon name='fork'/>) : (<></>) }</Table.Cell>
                  <Table.Cell>{repos.description}</Table.Cell>
              <Table.Cell>{repos.language}<Icon name={`${this.getLanguageIcon(repos.language)}`}/></Table.Cell>
                  <Table.Cell><a href={repos.html_url} target='_blank'>{repos.html_url}</a></Table.Cell>
                </Table.Row>
              )}

            </Table.Body>
            </>) }
            <Table.Footer fullWidth>
              <Table.Row>
                <Table.HeaderCell />
                <Table.HeaderCell colSpan='4'>

                </Table.HeaderCell>
              </Table.Row>
            </Table.Footer>
          </Table>
        </Container>
      </div>
    )
  }
}