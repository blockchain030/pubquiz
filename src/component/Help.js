import React, { Component } from 'react';
import { inject, observer } from 'mobx-react'
import Typography from '@material-ui/core/Typography'; // https://material-ui.com/api/typography/
import Button from '@material-ui/core/Button';


@inject('store') @observer class Help extends Component {
  render() {
    const { store } = this.props

    return (
      <div>
        <Typography paragraph={true} align='center' variant='caption'>Help</Typography>

        <Typography paragraph={true}>
          Help me if you can, I'm feeling down<br/>
          And I do appreciate you being round.<br/>
          Help me, get my feet back on the ground,<br/>
          Won't you please, please help me.<br/>
        </Typography>

        <Button style={{width:'100%'}} variant="contained" color="secondary" onClick={store.hideModal}>
          Close
        </Button>
      </div>
    );
  }
}

export default Help
