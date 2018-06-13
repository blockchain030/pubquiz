import React, { Component } from 'react';
import { inject, observer } from 'mobx-react'
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import LeftIcon from '@material-ui/icons/ChevronLeft'; // https://material.io/tools/icons/?style=baseline
import RightIcon from '@material-ui/icons/ChevronRight';
// import GradeIcon from '@material-ui/icons/Grade';


@inject('store') @observer class Grade extends Component {

  teams = [
    { score: 0, name: 'Team 1' , answer: 'Team 1 answer' },
    { score: 0, name: 'Team 2' , answer: 'Team 2 answer' },
    { score: 0, name: 'Team 3' , answer: 'Team 3 answer' },
    { score: 0, name: 'Team 4' , answer: 'Team 4 answer' },
    { score: 0, name: 'Team 5' , answer: 'Team 5 answer' },
    { score: 0, name: 'Team 6' , answer: 'Team 6 answer' },
    { score: 0, name: 'Team 7' , answer: 'Team 7 answer' },
    { score: 0, name: 'Team 8' , answer: 'Team 8 answer' },
    { score: 0, name: 'Team 9' , answer: 'Team 9 answer' },
    { score: 0, name: 'Team 10', answer: 'Team 10 answer' },
  ]

  onClickPreviousQuestion = () => {
    // console.log('onClickPreviousQuestion')
    const { quiz } = this.props.store
    quiz.setQuestionIndex((quiz.questionIndex + quiz.nQuestions - 1) % quiz.nQuestions)
  }

  onClickNextQuestion = () => {
    // console.log('onClickNextQuestion')
    const { quiz } = this.props.store
    quiz.setQuestionIndex((quiz.questionIndex + 1) % quiz.nQuestions)
  }

  renderTeam = (team) => {
    return (
      <div>
        {team.name} {team.answer} {team.score}
      </div>
    )
  }

  render() {
    const { quiz } = this.props.store
    const round = quiz.currentRound
    const question_answer = quiz.currentQuestion
    const question = quiz.currentQuestion.question
    const question_text = question.split('|')[0]
    // console.log(question_media)
    // console.log(question_text)

    return (
      <center>

        <Paper style={{width:'90%', padding:'15px'}}>
          {round.name}<br/>
          Round {quiz.roundIndex+1} of {quiz.nRounds} - Question {quiz.questionIndex+1} of {quiz.nQuestions}<br/>
          <br/>

          <h4>{question_text}</h4>
          <h5>Correct: {quiz.currentQuestion.answer}</h5>
          <h5>You: {quiz.currentQuestion.myAnswer}</h5>

          {this.teams.map(team => this.renderTeam(team))}
        </Paper>

        <Button onClick={this.onClickPreviousQuestion} variant="fab" color='primary' style={{position:'fixed', left:'5px', bottom:'5px'}}>
          <LeftIcon />
        </Button>

        {/* <Button onClick={this.onClickGrade} variant="fab" color='primary' style={{position:'fixed', left:'50%', bottom:'5px', transform:'translate(-50%,0)'}}>
          <GradeIcon />
        </Button> */}

        <Button onClick={this.onClickNextQuestion} variant="fab" color='primary' style={{position:'fixed', right:'5px', bottom:'5px'}}>
          <RightIcon />
        </Button>

      </center>
    );
  }
}

export default Grade;
