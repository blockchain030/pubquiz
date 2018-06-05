import React, { Component } from 'react';
import Button from '@material-ui/core/Button';

class Settings extends Component {
  onClicked = () => {
    console.log('yes')
    alert('yes')
  }

  render() { // Button variant="contained" 
    return (
      <Button color="primary" onClick={this.onClicked}>
        I'm a settings button 
      </Button>
    );
  }
}

export default Settings;
