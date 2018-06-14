import React, { Component } from 'react';
import { inject, observer } from 'mobx-react'
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

@inject('store') @observer class TestContract extends Component {
  doApiCall = (apicall, callback) => {
    try {
      const request = require('request');

      var url = "https://pubquiz.fun/api" + apicall;

      // use local node API during testing
      if(process.env.NODE_ENV==='development') {   // &&false -> use server during development
        url = "http://localhost:3001" + apicall;
      }
      console.log('call pubquiz API : ', url)
      request(url, { json: true }, callback);

      return true;
    } catch(ex) {
      console.log('TestConstract.doApiCall: error ' + ex.message)
      return false;
    }
  }

  onClickedCreateQuiz = () => {
    var apicall = "/quiz/create";
    this.doApiCall(apicall, (err, res, body) => {
      if (err) {
        console.log(apicall + ' failed: ' + err);
        return false;
      }

      console.log(body)

      alert('Tada! I created a quiz!' + JSON.stringify(body,0,2));

      return true;
    });

    return true;
  }

  onClickedGetAddress = () => {
    var apicall = "/quiz/getaddress";
    this.doApiCall(apicall, (err, res, body) => {
      if (err) {
        console.log(apicall + ' failed: ' + err);
        return false;
      }

      console.log(body)

      alert(JSON.stringify(body,0,2));

      return true;
    });

    return true;
  }

  onClickedNext = () => {
    var apicall = "/quiz/nextstep";
    this.doApiCall(apicall, (err, res, body) => {
      if (err) {
        console.log(apicall + ' failed: ' + err);
        return false;
      }

      console.log(body)

      alert(JSON.stringify(body,0,2));

      return true;
    });
  }

  onClickedTestTestTest = () => {
    console.log("env: " + process.env.NODE_ENV);

    alert("zie console log");

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
          <Button style={{width:'100%'}} variant="contained" color="primary" onClick={this.onClickedCreateQuiz}>
            Create Quiz
          </Button><br/><br/>
          <Button style={{width:'100%'}} variant="contained" color="primary" onClick={this.onClickedGetAddress}>
            Get Address
          </Button><br/><br/>
          <Button style={{width:'100%'}} variant="contained" color="primary" onClick={this.onClickedNext}>
            Next Step
          </Button><br/><br/>
          <Button style={{width:'100%'}} variant="contained" color="primary" onClick={this.onClickedTestTestTest}>
            Test Test Test
          </Button><br/><br/>
          <Button style={{width:'100%'}} variant="contained" color="primary" onClick={this.props.store.setPage.bind(this,'register')}>
            Registration Page
          </Button><br/><br/>
        </Paper>
    );
  }
}

export default TestContract;
