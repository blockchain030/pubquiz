import React, { Component } from 'react';
import { inject, observer } from 'mobx-react'
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';


@inject('store') @observer class AnswerQuestion extends Component {
  
  handleMyAnswerChange = (myAnswer) => {
    // console.log('TODO: handleAnswerChange', myAnswer)
    const { quiz } = this.props.store
    const question = quiz.rounds.get(String(quiz.roundIndex)).questions.get(String(quiz.questionIndex))
    question.setMyAnswer(myAnswer) // update UI now
  }

  handleMyAnswerChangeEvent = (event) => {
    this.handleMyAnswerChange(event.target.value)
  }

  render() {
    const { quiz } = this.props.store
    const { rounds } = quiz
    const round = rounds.get(String(quiz.roundIndex))
    const question = round.questions.get(String(quiz.questionIndex)).question
    const [ question_text, question_media ] = question.split('|')
    // console.log(question_text)
    // console.log(question_media)

    return (
      <Paper style={{width:'90%', padding:'15px'}}>
        {round.name} (Round {quiz.roundIndex+1}) Question {quiz.questionIndex+1} of {rounds.size}<br/>
        
        <Paper style={{width:'50%'}}><img src={question_media} alt='' width='99%'/></Paper>

        <h1>{question_text}</h1>

        <TextField
          id="answer"
          label="Answer"
          fullWidth
          value={question.myAnswer}
          onChange={this.handleMyAnswerChangeEvent}
          margin="normal"
        />
      </Paper>
    );
  }
}

export default AnswerQuestion;
