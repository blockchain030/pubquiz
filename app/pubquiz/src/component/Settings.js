import React, { Component } from 'react';
import Button from '@material-ui/core/Button';

class Settings extends Component {
  onClickedButton = () => {
    console.log('onClickedButton')
  }

  render() { // Button variant="contained" 
    return (
      <Button color="primary" onClick={this.onClickedButton}>
        I'm a settings button 
      </Button>
    );
  }
}

export default Settings;
