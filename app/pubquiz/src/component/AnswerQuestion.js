import React, { Component } from 'react';
import { inject } from 'mobx-react'


@inject('store') class AnswerQuestion extends Component {
  render() {
    const { quiz } = this.props.store

    return (
      <div>
        Answer question
        <hr/>
        <pre>
          {JSON.stringify(quiz.toJSON(),null,2)}
        </pre>
      </div>
    );
  }
}

export default AnswerQuestion;
