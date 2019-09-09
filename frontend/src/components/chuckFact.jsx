import React from 'react'
import { Grid, Paper, Typography, LineCirclesBox, Chip } from '@parmais/par-ui-material'

export default class ChuckFact extends React.Component {
  render() {
    const { fact, category } = this.props

    return (
      <div>
        <Grid item>
          <Paper style={{padding: '50px', width: 650, marginBottom: '30px'}}>
            <LineCirclesBox lineColor ='#26a69a'>
              <Typography variant='h2'>
                { fact }
              </Typography>
            </ LineCirclesBox >
            <br/>
            {
              category.length > 0 &&
              <Chip label={category} />
            }
          </Paper>
        </Grid>
      </div>
    )
  }
}
