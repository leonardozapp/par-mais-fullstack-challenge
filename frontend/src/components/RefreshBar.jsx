import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Button, Typography, FormControl, InputLabel, Select, MenuItem } from '@parmais/par-ui-material';

class RefreshBar extends React.Component {

  handleCategoryChange = event => {
    this.props.selectCategory(event.target.value)
  }

  handleRefreshClick = () => {
    this.props.fetchRandom();
  }

  render() {
    const { categories, selectedCategory } = this.props;

    return (
      <div style={{width: '100%', marginBottom: '10px'}}>
        <Grid container justify='center'
              alignItems='center' direction='row'>
          <Grid item>
            <form style={{display: 'flex', flexWrap: 'wrap'}} noValidate autoComplete='off'>
              <FormControl>
                <Select
                  value={selectedCategory}
                  onChange={this.handleCategoryChange}
                  style={{marginTop: '16px', width: '150px'}}
                >
                  {
                    categories.map(value => {
                      return <MenuItem key={value} value={value}>{value.toUpperCase()}</MenuItem>
                    })
                  }
                </Select>
              </FormControl>
            </form>
          </Grid>
          <Grid item>
            <div style={{padding: '50px'}}>
              <Button
                onClick={this.handleRefreshClick}
                className={'button-random'}
                variant='contained'
              >
                <Typography
                  variant='button'
                  style={{
                    color: '#fff'
                  }}
                >
                  Random Fact
                </Typography>
              </Button>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

RefreshBar.propsType = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  category: PropTypes.string.isRequired,
  fetchRandom: PropTypes.func.isRequired,
  selectCategory: PropTypes.func.isRequired
}

export default RefreshBar;
