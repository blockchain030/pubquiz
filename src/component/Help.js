import React, { Component } from 'react';
import { inject } from 'mobx-react'
import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';


@inject('store') class Help extends Component {
  state = {
    open: true,
  }

  // handleOpen = () => {
  //   this.setState({ open: true })
  // }

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
        // onClose={this.handleClose}
        >

        <Paper style={{width:'80%', padding:'15px', position:'absolute', left:'50%', top:'50%', transform:'translate(-50%,-50%)'}}>
          <div>
            Help me if you can, I'm feeling down<br/>
            And I do appreciate you being round.<br/>
            Help me, get my feet back on the ground,<br/>
            Won't you please, please help me.
          </div>
          <br/>
          <Button onClick={this.handleClose} variant="contained" color='primary' >
            Close
          </Button>
        </Paper>

      </Modal>
    );
  }
}

export default Help
