import React from 'react'
import { Grid, Button, Typography, FormControl, InputLabel, Select, MenuItem, Paper, InputBase, IconButton, Divider } from '@parmais/par-ui-material'
import SearchIcon from '@material-ui/icons/Search'
import swagger from '../api'

export default class SearchBar extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      categories: [],
      category: 'any',
      query: ''
    }
  }

  componentDidMount() {
    swagger.then((client) => client.apis.facts.listCategories()
      .then(response => {
        this.setState({categories: response.body})
      }))
  }

  handleCategoryChange = event => {
    this.setState({category: event.target.value, query: ''})
  }

  onRefreshRandom = () => {
    this.setState({query: ''})

    const { refresh } = this.props
    const category = this.state.category === 'any' ? '' : this.state.category

    return refresh(category)
  }

  handleQueryChange = event => {
    this.setState({category: 'any', query: event.target.value})
  }

  onSearch = () => {
    this.setState({category: 'any'})

    const { search } = this.props
    return search(this.state.query)
  }

  render() {
    return (
      <div style={{marginBottom: '50px'}}>
        <Grid container justify='center'
              alignItems='center' direction='row'>
          <Grid item>
            <form style={{display: 'flex', flexWrap: 'wrap'}} autoComplete='off'>
              <FormControl>
                <InputLabel htmlFor='category-simple'>Category</InputLabel>
                <Select
                  value={this.state.category}
                  onChange={this.handleCategoryChange}
                  inputProps={{
                    name: 'Category',
                    id: 'category-simple',
                  }}
                  style={{ width: '150px' }}
                >
                  <MenuItem value={'any'}>ANY</MenuItem>
                  {
                    this.state.categories.map(value => {
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
                onClick={this.onRefreshRandom}
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
        <Grid container justify='center'
              alignItems='center' direction='row'>
          <Grid item xs={6} lg={3}>
            <Paper style={{
              padding: '2px 4px',
              display: 'flex',
              alignItems: 'center'
            }}>
              <InputBase
                value={this.state.query}
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
                color="primary"
                style={{padding: 10}}
                aria-label="search"
                onClick={this.onSearch}
                >
                <SearchIcon />
              </IconButton>
            </Paper>
          </Grid>
        </Grid>
      </div>
    )
  }
}
