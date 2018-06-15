import React, { Component } from 'react';
import { inject, observer } from 'mobx-react'
import Typography from '@material-ui/core/Typography'; // https://material-ui.com/api/typography/
import Button from '@material-ui/core/Button';


@inject('store') @observer class About extends Component {
  render() {
    const { store } = this.props

    return (
      <center>
        <Typography paragraph={true} align='center' variant='caption'>About</Typography>

        <Typography paragraph={true}>
          &copy; 2018 by blockchain030.nl
        </Typography>

        <Button style={{width:'100%'}} variant="contained" color="secondary" onClick={store.hideModal}>
          Close
        </Button>
      </center>
    );
  }
}

export default About;
