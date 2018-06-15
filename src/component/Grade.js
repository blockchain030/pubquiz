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
import submitGrades from '../smartcontract/submitGrades'


@inject('store') @observer class Grade extends Component {

  teams = [
    { score: 0, name: 'Team 1' , answer: 'Answer one' },
    { score: 0, name: 'Team 2' , answer: 'Answer two' },
    { score: 0, name: 'Team 3' , answer: 'Answer three' },
    { score: 0, name: 'Team 4' , answer: 'Answer four' },
    { score: 0, name: 'Team 5' , answer: 'Answer five' },
    { score: 0, name: 'Team 6' , answer: 'Answer six' },
    { score: 0, name: 'Team 7' , answer: 'Answer seven' },
    { score: 0, name: 'Team 8' , answer: 'Answer eight' },
    { score: 0, name: 'Team 9' , answer: 'Answer nine' },
    { score: 0, name: 'Team 10', answer: 'Answer ten' },
  ]

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
    submitGrades(store)

    store.setModal('waiting')

    if (store.quiz.roundIndex < store.quiz.nRounds-1) { // next round
      store.setNextPage('home-after-next-round')
    } else { // game over
      store.setNextPage('scores')
    }
  }

  handleChange = teamIndex => event => {
    this.teams[teamIndex].score = 1 - this.teams[teamIndex].score
    this.forceUpdate()
  };

  renderTeam = (team,teamIndex) => {
    return (
      <ListItem key={teamIndex}>
        <ListItemText primary={team.answer} secondary={team.name} />
        <Checkbox
            checked={team.score > 0}
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
    const question = quiz.currentQuestion.question
    const question_text = question.split('|')[0]
    // console.log(question_media)
    // console.log(question_text)

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
            {this.teams.map((team,teamIndex) => this.renderTeam(team,teamIndex))}
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
