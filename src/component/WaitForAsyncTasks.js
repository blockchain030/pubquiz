import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import delay from 'await-delay'

import Typography from '@material-ui/core/Typography'; // https://material-ui.com/api/typography/
import CircularProgress from '@material-ui/core/CircularProgress';

import getRound from '../async-tasks/getRound'
import registerTeam from '../async-tasks/registerTeam'
import getGradedAnswers from '../async-tasks/getGradedAnswers';
import submitMyAnswers from '../async-tasks/submitMyAnswers';
import getAnswers from '../async-tasks/getAnswers';
import submitGrades from '../async-tasks/submitGrades'
import getScores from '../async-tasks/getScores'


@inject('store') @observer class Waiting extends Component {

  taskManager = async () => {
    const { store } = this.props

    if (store.tasks.length === 0) {
      // console.log('NO MORE TASKS')
      this.onClickedContinue()
      return
    }

    const task = store.tasks[0]
    // console.log('TASK', task)

    switch (task) { 
      case 'registerTeam':
        await registerTeam(store)
        break

      case 'getRound':
        await getRound(store)
        break

      case 'submitMyAnswers':
        await submitMyAnswers(store)
        break
    
      case 'getAnswers':
        await getAnswers(store)
        break

      case 'getGradedAnswers':
        await getGradedAnswers(store)
        break

      case 'submitGrades':
        await submitGrades(store)
        break

      case 'getScores':
        await getScores(store)
        break

      default:
        console.error('UNKNOWN TASK', task)
        break
    }

    await delay(1000)  // extra delay until we talk with the actual blockchain
    store.shiftTask()  // remove this task from the FIFO queue
    this.taskManager() // execute the next task
  } // end of taskManager

  componentDidMount() {
    this.taskManager()
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
    const { store } = this.props

    return (
      <center>
        <Typography paragraph={true} variant='caption'>Waiting for smart contract</Typography>
        <CircularProgress size={50}/>
        <pre><Typography paragraph={true}>{store.tasks.length === 0 ? '' : store.tasks[0]}</Typography></pre>
      </center>
    );
  }
}

export default Waiting;
