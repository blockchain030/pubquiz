import React, { Component } from 'react';
import { inject, observer } from 'mobx-react'
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


@inject('store') @observer class Register extends Component {

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
    const { store } = this.props

    store.pushTask('registerTeam')
    store.setModal('waitForAsyncTasks')

    // store.pushTask('getQuestions')
    // store.team.setRegistered(true)
    // store.setModal('waitForAsyncTasks')
    // store.setNextPage('home')

    //
  }

onClickedSignout  = () => {
  const { store } = this.props

  store.team.signOut();

  store.pushTask('registerTeam')
  store.setModal('waitForAsyncTasks')
}

  render() {
    const { team, quiz } = this.props.store

    return (
      <center>

        <Paper style={{width:'90%', padding:'15px', position:'absolute', left:'50%', top:'50%', transform:'translate(-50%,-50%)'}}>
          <TextField
            id="name"
            label="Team name"
            fullWidth
            value={team.name}
            onChange={this.handleNameChangeEvent}
            margin="normal"
            disabled={team.registered}
          /><br/><br/>

          { team.address==='' ?
            <div><Button style={{width:'100%'}} variant="contained" color="primary" onClick={this.onClickedEnterSeed}>
            Scan QR code of seed
            </Button><br/><br/></div>: null
          }

          { team.registered===false ?
            <div><Button style={{width:'100%'}} variant="contained" color="secondary" onClick={this.onClickedJoinGame}  disabled={quiz.contractaddress===''}>
              { (quiz.contractaddress!=='') ? 'Join Quiz' : 'Waiting for registration to open' }
            </Button><br/><br/></div>:null
          }

          { team.address!=='' ?
            <div><Button style={{width:'100%'}} variant="contained" color="primary" onClick={this.onClickedSignout}>
            Sign out
            </Button><br/><br/></div> : null
          }

        </Paper>

      </center>
    );
  }
}

export default Register;
