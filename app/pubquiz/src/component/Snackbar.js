import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MaterialUISnackbar from '@material-ui/core/Snackbar';


class Snackbar extends Component {
  state = {
    open: false,
    text: '',
  }

  updateState = () => {
    const { text } = this.props.snackbar
    if (text !== this.state.text) {
      this.setState({
        open: text !== '',
        text: text
      })
    }    
  }

  componentDidMount() {
    setInterval(this.updateState, 100);
  }

  handleClose = () => {
    // console.log('handleClose')
    this.props.snackbar.hide()
  }

  render() {
    const { text } = this.props.snackbar
    // console.log('Snackbar.message', text)

    return (
      <MaterialUISnackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={this.state.open}
        autoHideDuration={5000}
        onClose={this.handleClose}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={<span id="message-id">{text}</span>}
      />
    );
  }
}

Snackbar.propTypes = {
  snackbar: PropTypes.object.isRequired,
}

export default Snackbar;
