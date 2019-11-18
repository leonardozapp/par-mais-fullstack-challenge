import React from 'react';
import { Grid, CircularProgress } from '@parmais/par-ui-material';
import swagger from '../api';
import ChuckFact from './ChuckFact';
import NoFact from './NoFact';
import ChuckHeader from './ChuckHeader';


class ChuckList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      facts: [],
      isLoading: false
    };
  }

  componentDidMount = () => {
    this.setState({isLoading: true});

    swagger
      .then(client => client.apis.facts.randomFact()
      .then(response => {
        this.setState({facts: [response.body], isLoading: false});
      }));
  }

  fetchRandomFact = category => {
    this.setState({isLoading: true});

    swagger
      .then(client => client.apis.facts.randomFact({category: category})
      .then(response => {
        this.setState({facts: [response.body], isLoading: false});
      }));
  }

  searchFact = query => {
    this.setState({isLoading: true});

    swagger
      .then(client => client.apis.facts.search({query: query})
      .then(response => {
        this.setState({facts: response.body.result, isLoading: false});
      }));
  }

  render() {
    const { isLoading, facts } = this.state;

    return (
      <div style={{padding: '20px 100px'}}>

        <ChuckHeader fetchRandomFact={this.fetchRandomFact} searchFact={this.searchFact}></ChuckHeader>

        <Grid container justify="center"
              alignItems="center" direction='column'>

          { isLoading && <CircularProgress style={{margin: 15}}/> }

          { !isLoading && facts.length > 0 && facts.map(fact => {
              return <ChuckFact fact={fact.value} category={fact.category} key={fact.id}></ChuckFact>
            })
          }

          { !isLoading && (!facts || !facts.length) && <NoFact />}
        </Grid>
      </div>
    );
  }
}

export default ChuckList;
