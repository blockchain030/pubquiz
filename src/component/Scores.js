import React, { Component } from 'react';
import { inject, observer } from 'mobx-react'
import Typography from '@material-ui/core/Typography'; // https://material-ui.com/api/typography/
import Button from '@material-ui/core/Button';


@inject('store') @observer class Scores extends Component {
  render() {
    const { store } = this.props
    
    return (        
      <div>
        <Typography paragraph={true} align='center' variant='caption'>Scores</Typography>
        
        <Typography paragraph={true}>
          1. oh<br/>
          2. yeah<br/>
          3. ...
        </Typography>

        <Button style={{width:'100%'}} variant="contained" color="secondary" onClick={store.hideModal}>
          Close
        </Button>
      </div>
    );
  }
}

export default Scores;
