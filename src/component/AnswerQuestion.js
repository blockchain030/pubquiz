import React, { Component } from 'react';
import { inject, observer } from 'mobx-react'
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import LeftIcon from '@material-ui/icons/ChevronLeft'; // https://material.io/tools/icons/?style=baseline
import RightIcon from '@material-ui/icons/ChevronRight';
import GradeIcon from '@material-ui/icons/Grade';
import getGradedAnswers from '../smartcontract/getGradedAnswers';
import submitMyAnswers from '../smartcontract/submitMyAnswers';
import getSomeFuckingAnswers from '../smartcontract/getSomeFuckingAnswers';


@inject('store') @observer class AnswerQuestion extends Component {
  
  handleMyAnswerChange = (myAnswer) => {
    const { quiz } = this.props.store
    quiz.currentQuestion.setMyAnswer(myAnswer) // update UI now
  }

  handleMyAnswerChangeEvent = (event) => {
    this.handleMyAnswerChange(event.target.value)
  }

  onClickPreviousQuestion = () => {
    const { quiz } = this.props.store
    quiz.setQuestionIndex((quiz.questionIndex + quiz.nQuestions - 1) % quiz.nQuestions)
  }

  onClickNextQuestion = () => {
    const { quiz } = this.props.store
    quiz.setQuestionIndex((quiz.questionIndex + 1) % quiz.nQuestions)
  }

  onClickGrade = () => {
    const { store } = this.props
    // const { currentRound } = store.quiz
    submitMyAnswers(store)
    getSomeFuckingAnswers(store)
    getGradedAnswers(store)
    
    store.quiz.setQuestionIndex(0)
    store.setModal('waiting')
    store.setNextPage('grade')
  }

  renderMedia = (question_media) => {
    if (!question_media) { // nothing to show
      return null
    }

    // console.log(question_media)

    const isYoutube = question_media && question_media.indexOf('youtube.com') >= 0
    let embedLink
    if (isYoutube) {
      const v = question_media.indexOf('v=')
      embedLink = "https://www.youtube.com/embed/" + question_media.substr(v+2,11) + "?modestbranding=1" //+ "?rel=0"
      // console.log(embedLink)
    }

    return (
      <Paper style={{width:'50%'}}>
        {isYoutube
          ? <iframe width='100%' title='videoQuestion' src={embedLink} frameBorder="0" allow="encrypted-media" allowFullScreen />
          : <img src={question_media} alt='' width='98%' />
        }
      </Paper>
    )
  }

  render() {
    if (!this.props.store.team.registered) return null // left the quiz

    const { quiz } = this.props.store
    const round = quiz.currentRound
    const question_answer = quiz.currentQuestion
    const question = quiz.currentQuestion.question
    const [ question_text, question_media ] = question.split('|')
    // console.log(question_media)
    // console.log(question_text)

    return (
      <center>

        <Paper style={{width:'90%', padding:'15px'}}>
          {round.name}<br/>
          Round {quiz.roundIndex+1} of {quiz.nRounds} - Question {quiz.questionIndex+1} of {quiz.nQuestions}<br/>
          <br/>
          {this.renderMedia(question_media)}

          <h4>{question_text}</h4>

          <TextField
            id="answer"
            label="Answer"
            fullWidth
            value={question_answer.myAnswer}
            onChange={this.handleMyAnswerChangeEvent}
            margin="normal"
          />
        </Paper>

        <Button onClick={this.onClickPreviousQuestion} variant="fab" color='primary' style={{position:'fixed', left:'5px', bottom:'5px'}}>
          <LeftIcon />
        </Button>

        <Button onClick={this.onClickGrade} variant="fab" color='primary' style={{position:'fixed', left:'50%', bottom:'5px', transform:'translate(-50%,0)'}}>
          <GradeIcon />
        </Button>

        <Button onClick={this.onClickNextQuestion} variant="fab" color='primary' style={{position:'fixed', right:'5px', bottom:'5px'}}>
          <RightIcon />
        </Button>

      </center>
    );
  }
}

export default AnswerQuestion;
