import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Paper, Typography, LineCirclesBox, Chip } from '@parmais/par-ui-material';

function ChuckFact({ fact, category }) {
  return (
    <div>
      <Grid item>
        <Paper style={{padding: '50px', width: 650, marginBottom: '30px'}}>
          <LineCirclesBox lineColor='#26a69a'>
            <Typography variant='h2'>
              { fact }
            </Typography>
          </ LineCirclesBox >
          <br/>
          {
            category && category.length > 0 &&
            <Chip label={category} />
          }
        </Paper>
      </Grid>
    </div>
  );
}

ChuckFact.propTypes = {
  fact: PropTypes.string.isRequired,
  category: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default ChuckFact;
