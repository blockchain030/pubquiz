import React, { Component } from 'react';
import { inject, observer } from 'mobx-react'
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import LeftIcon from '@material-ui/icons/ChevronLeft'; // https://material.io/tools/icons/?style=baseline
import RightIcon from '@material-ui/icons/ChevronRight';


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

  onClickPreviousQuestion = () => {
    // console.log('onClickPreviousQuestion')
    const { quiz } = this.props.store
    const nQuestions = quiz.rounds.get(String(quiz.roundIndex)).questions.size
    quiz.setQuestionIndex((quiz.questionIndex + nQuestions - 1) % nQuestions)
  }

  onClickNextQuestion = () => {
    // console.log('onClickNextQuestion')
    const { quiz } = this.props.store
    const nQuestions = quiz.rounds.get(String(quiz.roundIndex)).questions.size
    quiz.setQuestionIndex((quiz.questionIndex + 1) % nQuestions)
  }

  render() {
    const { quiz } = this.props.store
    const { rounds } = quiz
    const round = rounds.get(String(quiz.roundIndex))
    const question_answer = round.questions.get(String(quiz.questionIndex))
    const question = question_answer.question
    const [ question_text, question_media ] = question.split('|')
    // console.log(question_media)
    // console.log(question_text)

    const isYoutube = question_media && question_media.indexOf('youtube.com') >= 0
    let embedLink
    if (isYoutube) {
      const v = question_media.indexOf('v=')
      embedLink = "https://www.youtube.com/embed/" + question_media.substr(v+2,11) + "?modestbranding=1" //+ "?rel=0"
      // console.log(embedLink)
    }

    return (
      <center>

        <Paper style={{width:'90%', padding:'15px'}}>
          {round.name} (Round {quiz.roundIndex+1}/{rounds.size}) Question {quiz.questionIndex+1}/{rounds.get(String(quiz.roundIndex)).questions.size}<br/>
          <br/>
          <Paper style={{width:'50%'}}>
            {isYoutube
              ? <iframe width='100%' title='videoQuestion' src={embedLink} frameBorder="0" allow="encrypted-media" allowFullScreen />
              : <img src={question_media} alt='' width='98%' />
            }    
          </Paper>

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

        <Button onClick={this.onClickNextQuestion} variant="fab" color='primary' style={{position:'fixed', right:'5px', bottom:'5px'}}>
          <RightIcon />
        </Button>

      </center>
    );
  }
}

export default AnswerQuestion;
