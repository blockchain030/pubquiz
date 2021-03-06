import React, { Component } from 'react';
import { doApiCall } from '../apitools';
import { inject, observer } from 'mobx-react'
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography'; // https://material-ui.com/api/typography/
import Button from '@material-ui/core/Button';

@inject('store') @observer class TestContract extends Component {
  onClickedCreateQuiz = () => {
    var apicall = "/quiz/create";
    doApiCall(apicall).then((body) => {
      console.log(body)
      alert('Tada! I created a quiz!' + JSON.stringify(body,0,2));

      return true;
    }).catch((ex)=>{
      console.log('create quiz failed: ', ex);
    });

    return true;
  }

  onClickedEndQuiz = () => {
    var apicall = "/quiz/end";
    doApiCall(apicall).then((body) => {
      console.log(body)
      alert('Tada! I ended a quiz!' + JSON.stringify(body,0,2));

      return true;
    }).catch((ex)=>{
      console.log('create quiz failed: ', ex);
    });

    return true;
  }

  onClickedShowTeams = async () => {
    const { pubquiz } = global
    // get a list of teams from the contract, for each team, look up the team name
    var teams = await pubquiz.getTeamAccts();
    teams.forEach(async (team) => {
      var info = await pubquiz.getTeam(team)
      console.log(info[0], info[1].toString());
      // console.log(info.name, info.score.toString());
    });
  }

  onClickedNext = () => {
    var apicall = "/quiz/nextstep";

    doApiCall(apicall).then((body) => {
      console.log(body)

      alert(JSON.stringify(body,0,2));

      return true;
    }).catch((ex)=>{
      console.log('OnClickedNext failed: ', ex);
    });

    return true;
  }

  onClickedTestTestTest = () => {
    console.log("env: " + process.env.NODE_ENV);

    var doSomething = async () => {
      const { pubquiz } = global
      // register the team in the current contract\
      console.log(await pubquiz.getTeamAccts());
    }

    doSomething();

    return true;
  };

  render() {
    // const { quiz } = this.props.store
    // const round = quiz.currentRound
    // const question = quiz.currentQuestion.question
    // const question_text = question.split('|')[0]
    // console.log(question_media)
    // console.log(question_text)

    return (
        <Paper style={{width:'80%', padding:'15px', position:'absolute', left:'50%', top:'50%', transform:'translate(-50%,-50%)'}}>
          <Typography paragraph={true} align='center' variant='caption'>Test Contracts</Typography>

          <Button style={{width:'100%'}} variant="contained" color="primary" onClick={this.onClickedCreateQuiz}>
            Create Quiz
          </Button><br/><br/>
          <Button style={{width:'100%'}} variant="contained" color="primary" onClick={this.onClickedShowTeams}>
            Show Teams
          </Button><br/><br/>
          <Button style={{width:'100%'}} variant="contained" color="primary" onClick={this.onClickedNext}>
            Next Step
          </Button><br/><br/>
          <Button style={{width:'100%'}} variant="contained" color="primary" onClick={this.onClickedEndQuiz}>
            End Quiz
          </Button><br/><br/>
          <Button style={{width:'100%'}} variant="contained" color="primary" onClick={this.onClickedTestTestTest}>
            Test Test Test
          </Button><br/><br/>
          <Button style={{width:'100%'}} variant="contained" color="secondary" onClick={this.props.store.setPage.bind(this,'register')}>
            Registration Page
          </Button>
        </Paper>
    );
  }
}

export default TestContract;
