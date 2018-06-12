import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import MaterialUISnackbar from '@material-ui/core/Snackbar';


const styles = theme => ({
  snackbarContent: {
    width: '60%',
    flexGrow: '0',
    display: 'unset',
  },
});


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
    this.props.snackbar.hide()
  }

  render() {
    const { classes } = this.props
    const { text } = this.props.snackbar

    return (
      <center>
        <MaterialUISnackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          open={this.state.open}
          autoHideDuration={5000}
          onClose={this.handleClose}
          ContentProps={{
            'aria-describedby': 'message-id',
            className: classes.snackbarContent,
          }}
          message={<span id="message-id">{text}</span>}
        />
      </center>
  );
  }
}

Snackbar.propTypes = {
  classes: PropTypes.object.isRequired,
  snackbar: PropTypes.object.isRequired,
}

export default withStyles(styles)(Snackbar);
