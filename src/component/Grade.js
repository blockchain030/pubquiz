import React, { Component } from 'react';
import { inject, observer } from 'mobx-react'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography'; // https://material-ui.com/api/typography/
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import LeftIcon from '@material-ui/icons/ChevronLeft'; // https://material.io/tools/icons/?style=baseline
import RightIcon from '@material-ui/icons/ChevronRight';
import SendIcon from '@material-ui/icons/Send';


@inject('store') @observer class Grade extends Component {

  onClickPreviousQuestion = () => {
    const { quiz } = this.props.store
    quiz.setQuestionIndex((quiz.questionIndex + quiz.nQuestions - 1) % quiz.nQuestions)
  }

  onClickNextQuestion = () => {
    const { quiz } = this.props.store
    quiz.setQuestionIndex((quiz.questionIndex + 1) % quiz.nQuestions)
  }

  onClickSend = () => {
    const { store } = this.props
    
    store.pushTask('submitGrades')
    store.pushTask('getScores')

    store.setModal('waitForAsyncTasks')

    if (store.quiz.roundIndex < store.quiz.nRounds-1) { // next round
      store.setNextPage('home-after-next-round')
    } else { // game over
      store.setNextPage('scores')
    }
  }

  handleChange = teamIndex => event => {
    const { currentQuestion } = this.props.store.quiz
    const { gradedAnswers } = currentQuestion
    currentQuestion.setGrade(teamIndex, 1 - gradedAnswers[teamIndex].grade)
  };

  renderTeam = (teamIndex, gradedAnswer) => {
    return (
      <ListItem key={teamIndex}>
        <ListItemText primary={gradedAnswer.answer} secondary={gradedAnswer.teamName} />
        <Checkbox
            checked={gradedAnswer.grade > 0}
            onChange={this.handleChange(teamIndex)}
            value={String(teamIndex)}
            color='primary'
        />
      </ListItem>
    )
  }

  render() {
    if (!this.props.store.team.registered) return null // left the quiz

    const { quiz } = this.props.store
    const round = quiz.currentRound
    const { currentQuestion } = quiz
    const { gradedAnswers } = currentQuestion
    const question = currentQuestion.question
    const question_text = question.split('|')[0]

    return (
      <center>

        <Paper style={{width:'90%', padding:'15px'}}>
          <Typography variant='caption'>
            {round.name}<br/>
            Round {quiz.roundIndex+1} of {quiz.nRounds} - Question {quiz.questionIndex+1} of {quiz.nQuestions} 
          </Typography>

          <Typography variant='body2'>{question_text}</Typography>
          <Typography variant='body2'>Correct: {quiz.currentQuestion.answer}</Typography>
          <Typography variant='body2'>You: {quiz.currentQuestion.myAnswer}</Typography>

          <List>
            {gradedAnswers.map((gradedAnswer,teamIndex) => this.renderTeam(teamIndex,gradedAnswer))}
          </List>

        </Paper>

        <Button onClick={this.onClickPreviousQuestion} variant="fab" color='primary' style={{position:'fixed', left:'5px', bottom:'5px'}}>
          <LeftIcon />
        </Button>

        <Button onClick={this.onClickSend} variant="fab" color='primary' style={{position:'fixed', left:'50%', bottom:'5px', transform:'translate(-50%,0)'}}>
          <SendIcon />
        </Button>

        <Button onClick={this.onClickNextQuestion} variant="fab" color='primary' style={{position:'fixed', right:'5px', bottom:'5px'}}>
          <RightIcon />
        </Button>

      </center>
    );
  }
}

export default Grade;
