import React, { Component } from 'react';
import { inject } from 'mobx-react'
import Button from '@material-ui/core/Button';


@inject('store') class Home extends Component {
  onClickedEnterSeed = () => {
    this.props.store.setPage('enterseed')
  }

  render() {
    return (
      <Button variant="contained" color="primary" onClick={this.onClickedEnterSeed}>
        Enter seed
      </Button>
    );
  }
}

export default Home;
