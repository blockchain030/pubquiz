import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { inject, observer } from 'mobx-react'
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography'; // https://material-ui.com/api/typography/
import Button from '@material-ui/core/Button';


const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  // table: {
  //   minWidth: 700,
  // },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
});


/*@inject('store') @observer*/ class Scores extends Component {
  render() {
    const { store, classes } = this.props
    
    return (        
      <div>
        <Typography paragraph={true} align='center' variant='caption'>Scores after round {store.teamScores.afterRound + 1}</Typography>
        
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Team</TableCell>
              <TableCell numeric>Score</TableCell>
              <TableCell numeric>Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {store.teamScores.teamScoreInfo.map((teamScoreInfo,teamIndex) => {
              return (
                <TableRow className={classes.row} key={teamScoreInfo.teamId}>
                  <TableCell component="th" scope="row">{teamIndex + 1}</TableCell>
                  <TableCell>{teamScoreInfo.teamName}</TableCell>
                  <TableCell numeric>{0}</TableCell>
                  <TableCell numeric>{teamScoreInfo.points}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>

        <Button style={{width:'100%'}} variant="contained" color="secondary" onClick={store.hideModal}>
          Close
        </Button>
      </div>
    );
  }
}

Scores.propTypes = {
  store: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Scores)
