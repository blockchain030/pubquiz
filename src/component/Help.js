import React, { Component } from 'react';
import { inject } from 'mobx-react'
import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';


@inject('store') class Help extends Component {
  state = {
    open: true,
  }

  handleOpen = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({ open: false })
    this.props.store.setPage('home')
  }

  render() {
    return (
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={this.state.open}
        onClose={this.handleClose}>

        <Paper onClick={this.handleClose} style={{position:'fixed', left:'5%', top:'5%', width:'90%', height:'90%'}}>
          <div style={{padding: '10px'}}>
            Help me if you can, I'm feeling down<br/>
            And I do appreciate you being round.<br/>
            Help me, get my feet back on the ground,<br/>
            Won't you please, please help me.
          </div>
        </Paper>

      </Modal>
    );
  }
}

export default Help
