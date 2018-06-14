import React, { Component } from 'react';
import { inject, observer } from 'mobx-react'
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';


@inject('store') @observer class Scores extends Component {

  onClickedClose = () => {
    this.props.store.setPage(this.props.store.nextPage)
  }

  render() {    
    return (        
      <Paper style={{width:'80%', padding:'15px', position:'absolute', left:'50%', top:'50%', transform:'translate(-50%,-50%)'}}>
        Scores<br/>
        <br/>
        <Button style={{width:'100%'}} variant="contained" color="secondary" onClick={this.onClickedClose}>
          Close
        </Button>
      </Paper>
    );
  }
}

export default Scores;
