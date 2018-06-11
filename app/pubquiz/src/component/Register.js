import React, { Component } from 'react';
import { inject, observer } from 'mobx-react'
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import resetQuiz from '../util/resetQuiz'


@inject('store') @observer class Home extends Component {
  
  handleNameChange = (name) => {
    // console.log('handleNameChange', name)
    this.props.store.team.setName(name) // update UI now
  }
  
  handleNameChangeEvent = (event) => {
    this.handleNameChange(event.target.value)
  }

  onClickedEnterSeed = () => {
    this.props.store.setPage('enterseed')
  }

  onClickedJoinGame = () => {
    resetQuiz(this.props.store)
    this.props.store.team.setRegistered(true)
    // console.log( JSON.stringify(this.props.store.toJSON(),null,2) )
  }

  render() {
    const { team } = this.props.store
    
    return (<center>
      <Paper style={{width:'90%', padding:'15px'}}>
        <TextField
          id="name"
          label="Team name"
          fullWidth
          value={team.name}
          onChange={this.handleNameChangeEvent}
          margin="normal"
        /><br/><br/>

        <Button style={{width:'100%'}} variant="contained" color="primary" onClick={this.onClickedEnterSeed}>
          Scan QR code of seed
        </Button><br/><br/>

        <Button style={{width:'100%'}} variant="contained" color="secondary" onClick={this.onClickedJoinGame}>
          Join Quiz
        </Button>
      </Paper></center>
    );
  }
}

export default Home;
