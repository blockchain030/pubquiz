import React, { Component } from 'react';
import { inject, observer } from 'mobx-react'
import CircularProgress from '@material-ui/core/CircularProgress';


@inject('store') @observer class Waiting extends Component {

  componentDidMount() {
    setTimeout(this.onClickedContinue, 3000)
  }

  onClickedContinue = () => {
    const { store } = this.props
    // console.log('nextPage', store.nextPage)
    
    if (store.nextPage === 'home-after-next-round') {
      store.hideModal()
      store.quiz.setRoundIndex(store.quiz.roundIndex + 1, 0)
      store.setNextPage('home')
    } else if (store.nextPage === 'scores') { // Game Over! reset to beginning
      store.setModal(store.nextPage)
      store.setNextPage('register')
    } else {
      store.hideModal()
    }

    // and go to store.nextPage from Modals.js
  }

  render() {    
    return (        
      <center>
        Waiting for smart contract<br/>
        <br/>
        <CircularProgress size={50}/>
      </center>
    );
  }
}

export default Waiting;
