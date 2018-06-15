import React, { Component } from 'react';
import { inject, observer } from 'mobx-react'
import Button from '@material-ui/core/Button';


@inject('store') @observer class Scores extends Component {
  render() {
    const { store } = this.props
    
    return (        
      <div>
        <center>Scores</center>
        <br/>
        1. oh<br/>
        2. yeah<br/>
        3. ...<br/>
        <br/>
        <Button style={{width:'100%'}} variant="contained" color="secondary" onClick={store.hideModal}>
          Close
        </Button>
      </div>
    );
  }
}

export default Scores;
