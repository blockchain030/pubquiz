import React, { Component } from 'react';
import Button from '@material-ui/core/Button';


class Settings extends Component {
  onClickedSettingsButton = () => {
    console.log('onClickedSettingsButton')
  }

  render() { // Button variant="contained" 
    return (
      <Button variant="contained" color="primary" onClick={this.onClickedSettingsButton}>
        I'm a settings button 
      </Button>
    );
  }
}

export default Settings;
