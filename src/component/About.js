import React, { Component } from 'react';
import { inject, observer } from 'mobx-react'
import Button from '@material-ui/core/Button';


@inject('store') @observer class About extends Component {
  render() {
    const { store } = this.props

    return (
      <center>
        &copy; 2018 by blockchain030.nl<br/>
        <br/>
        <Button style={{width:'100%'}} variant="contained" color="secondary" onClick={store.hideModal}>
          Close
        </Button>
      </center>
    );
  }
}

export default About;
