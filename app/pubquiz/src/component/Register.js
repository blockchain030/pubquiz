import React, { Component } from 'react';
import { inject } from 'mobx-react'
import Button from '@material-ui/core/Button';
import resetQuiz from '../util/resetQuiz'


@inject('store') class Home extends Component {
  onClickedEnterSeed = () => {
    this.props.store.setPage('enterseed')
  }

  onClickedJoinGame = () => {
    resetQuiz(this.props.store)
    console.log( JSON.stringify(this.props.store.toJSON(),null,2) )
    this.props.store.setRegistered(true)
  }

  render() {
    return (
      <div>
        [Team name can be input here]<br/>
        <Button variant="contained" color="primary" onClick={this.onClickedEnterSeed}>
          Scan QR code of seed
        </Button><br/>
        <Button variant="contained" color="secondary" onClick={this.onClickedJoinGame}>
          Join Game
        </Button>
      </div>
    );
  }
}

export default Home;
