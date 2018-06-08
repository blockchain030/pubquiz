import React, { Component } from 'react';
import { inject } from 'mobx-react'
import Button from '@material-ui/core/Button';
import resetQuiz from '../util/resetQuiz'


@inject('store') class Home extends Component {
  onClickedEnterSeed = () => {
    this.props.store.setPage('enterseed')
  }

  onClickedResetQuiz = () => {
    resetQuiz(this.props.store)
    console.log( JSON.stringify(this.props.store.toJSON(),null,2) )
  }

  render() {
    return (
      <div>
        <Button variant="contained" color="primary" onClick={this.onClickedEnterSeed}>
          Enter seed
        </Button>

        <Button variant="contained" color="primary" onClick={this.onClickedResetQuiz}>
          Reset Quiz
        </Button>
      </div>
    );
  }
}

export default Home;
