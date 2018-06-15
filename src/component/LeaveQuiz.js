import React, { Component } from 'react';
import { inject, observer } from 'mobx-react'
import Button from '@material-ui/core/Button';


@inject('store') @observer class LeaveQuiz extends Component {
  
  onClickLeaveQuiz = () => {
    const { store } = this.props

    store.team.setRegistered(false)
    store.quiz.reset('')
    store.setNextPage('register')
    store.hideModal()
  }

  render() {
    const { store } = this.props

    return (
      <center>
        {store.quiz.name}<br/>
        <br/>
        Are you sure you want to leave?<br/>
        <br/>
        <Button style={{width:'50%'}} variant="contained" color="primary" onClick={store.hideModal}>
          No
        </Button>
        <Button style={{width:'50%'}} variant="contained" color="secondary" onClick={this.onClickLeaveQuiz}>
          Yes
        </Button>
      </center>
    );
  }
}

export default LeaveQuiz
