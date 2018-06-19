import React, { Component } from 'react';
import { inject, observer } from 'mobx-react'
import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
// import Button from '@material-ui/core/Button';
import Scores from './Scores'
import Help from './Help'
import About from './About'
import Waiting from './Waiting'
import LeaveQuiz from './LeaveQuiz'


@inject('store') @observer class Modals extends Component {

  state = {
    open: false,
  }

  updateState = () => {
    const { store } = this.props
    const open = store.modal !== ''
    if (open !== this.state.open) {
      this.setState({
        open: open,
      })
      if (!open) { // i.e. closed
        store.setPage(store.nextPage)
      }
    }
  }

  componentDidMount() {
    setInterval(this.updateState, 100) // XXX should be able to do this better with mobx !!!
  }

  render() {
    const { store } = this.props

    return (
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={this.state.open}
        >

        <Paper style={{width:'80%', padding:'15px', position:'absolute', left:'50%', top:'50%', transform:'translate(-50%,-50%)'}}>
          {store.modal === 'scores'    && <Scores   store={store}/>}
          {store.modal === 'help'      && <Help     />}
          {store.modal === 'about'     && <About    />}
          {store.modal === 'leavequiz' && <LeaveQuiz/>}
          {store.modal === 'waiting'   && <Waiting  />}
        </Paper>

      </Modal>
    );
  }
}

export default Modals
