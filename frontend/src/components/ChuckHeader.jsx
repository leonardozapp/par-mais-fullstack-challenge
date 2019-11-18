import React from 'react';
import PropTypes from 'prop-types';
import swagger from '../api';
import { Grid } from '@parmais/par-ui-material';
import SearchBar from './SearchBar';
import RefreshBar from './RefreshBar';

class ChuckHeader extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: ['any'],
      selectedCategory: 'any',
      query: ''
    };
  }

  componentDidMount = () => {
    const categories = this.state.categories;

    swagger
      .then(client => client.apis.facts.listCategories()
      .then(response => {
        this.setState({categories: categories.concat(response.body)});
      }));
  }

  handleCategoryChange = category => {
    this.setState({selectedCategory: category, query: ''});
  }

  handleFetchRandom = () => {
    this.setState({query: ''});

    const category = this.state.selectedCategory === 'any' ? '' : this.state.selectedCategory;

    this.props.fetchRandomFact(category);
  }

  handleQueryChange = query => {
    this.setState({selectedCategory: 'any', query: query});
  }

  handleSearch = () => {
    this.setState({selectedCategory: 'any'});

    const query = this.state.query;

    this.props.searchFact(query);
  }

  render() {
    const { categories, selectedCategory, query } = this.state;

    return (
      <div style={{marginBottom: '50px'}}>
        <Grid container justify='center'
              alignItems='center' direction='row'>
            <RefreshBar categories={categories} selectedCategory={selectedCategory}
            selectCategory={this.handleCategoryChange} fetchRandom={this.handleFetchRandom}></RefreshBar>

            <SearchBar query={query} searchFact={this.handleSearch} onQueryChange={this.handleQueryChange}></SearchBar>
        </Grid>
      </div>
    );
  }
}

ChuckHeader.propTypes = {
  fetchRandomFact: PropTypes.func.isRequired,
  searchFact: PropTypes.func.isRequired
};

export default ChuckHeader;
