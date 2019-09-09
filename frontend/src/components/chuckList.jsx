import React from 'react'
import { Grid, CircularProgress } from '@parmais/par-ui-material'
import swagger from '../api'
import ChuckFact from './chuckFact'
import SearchBar from './searchBar'


export default class ChuckList extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      facts: [],
      loading: false
    }
  }

  componentDidMount() {
    this.setState({loading: true})
    swagger.then((client) => client.apis.facts.randomFact().then(response => {
      this.setState({facts: [response.body], loading: false})
    }))
  }

  refreshRandom = category => {
    this.setState({loading: true})
    swagger.then((client) => client.apis.facts.randomFact({category: category}).then(response => {
      this.setState({facts: [response.body], loading: false})
    }))
  }

  searchFact = query => {
    this.setState({loading: true})
    swagger.then((client) => client.apis.facts.search({query: query}).then(response => {
      this.setState({facts: response.body.result, loading: false})
    }))
  }

  render() {
    return (
      <div style={{padding: '20px 100px'}}>
        <SearchBar refresh={this.refreshRandom} search={this.searchFact}></SearchBar>
        <Grid container justify="center"
              alignItems="center" direction='column'>
          { this.state.loading && <CircularProgress style={{margin: 15}}/> }
          { !this.state.loading &&
            this.state.facts.map((fact, key) => {
              return <ChuckFact fact={fact.value} category={fact.category} key={key}></ChuckFact>
            })
          }
        </Grid>
      </div>
    )
  }
}
