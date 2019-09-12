import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Paper, InputBase, IconButton, Divider } from '@parmais/par-ui-material';
import SearchIcon from '@material-ui/icons/Search';


class SearchBar extends React.Component {

  handleQueryChange = event => {
    this.props.onQueryChange(event.target.value);
  }

  handleSearchClick = () => {
    if (this.props.query.length >= 3) {
      this.props.searchFact();
    }
    //TODO Show error message
  }

  render() {
    const { query } = this.props;

    return (
      <div style={{width: '100%', marginBottom: '10px'}}>
        <Grid container justify='center'
              alignItems='center' direction='row'>
          <Grid item xs={6} lg={3}>
            <Paper style={{
              padding: '2px 4px',
              display: 'flex',
              alignItems: 'center'
            }}>
              <InputBase
                value={query}
                style={{marginLeft: 8, flex: 1}}
                placeholder="Search..."
                inputProps={{ 'aria-label': 'search' }}
                onChange={this.handleQueryChange}
              />
              <Divider style={{
                width: 1,
                height: 28,
                margin: 4,
              }} />
              <IconButton
                color={query.length >= 3 ? "primary" : "default"}
                style={{padding: 10}}
                aria-label="search"
                onClick={this.handleSearchClick}
              >
                <SearchIcon />
              </IconButton>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

SearchBar.propTypes = {
  query: PropTypes.string.isRequired,
  searchFact: PropTypes.func.isRequired,
  onQueryChange: PropTypes.func.isRequired
};

export default SearchBar;
