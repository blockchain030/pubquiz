import React, { Component } from 'react';
import { inject } from 'mobx-react'
import Button from '@material-ui/core/Button';
import getQuiz from '../util/getQuiz'


@inject('store') class Home extends Component {
  onClickedEnterSeed = () => {
    this.props.store.setPage('enterseed')
  }

  onClickedGetQuiz = () => {
    // console.log('onClickedGetQuiz')
    const quiz = getQuiz(this.props.store)
    console.log(quiz)
  }

  render() {
    return (
      <div>
        <Button variant="contained" color="primary" onClick={this.onClickedEnterSeed}>
          Enter seed
        </Button>

        <Button variant="contained" color="primary" onClick={this.onClickedGetQuiz}>
          Get Quiz
        </Button>
      </div>
    );
  }
}

export default Home;
