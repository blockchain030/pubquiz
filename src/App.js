import React, { Component } from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { inject, observer } from 'mobx-react'

import AsyncComponent from './component/AsyncComponent'

import PubquizTheme from './PubquizTheme';
import MyAppBar from './component/MyAppBar';
// import Snackbar from './component/Snackbar';

import Register from './component/Register';
import AnswerQuestion from './component/AnswerQuestion';
import Grade from './component/Grade';
import { doApiCall } from './apitools.js';

const EnterSeed = AsyncComponent(() => import(/* webpackChunkName: "EnterSeed" */ "./component/EnterSeed"));
const TestContract = AsyncComponent(() => import(/* webpackChunkName: "TestContract" */ "./component/TestContract"));
const Modals = AsyncComponent(() => import(/* webpackChunkName: "Modals" */ "./component/Modals"));

// note: to get decorators working with create-react-app without using eject:
//    https://www.leighhalliday.com/mobx-create-react-app-without-ejecting

@inject('store') @observer class App extends Component {
  componentWillMount() {
    // first ask the oracle for the current quiz address
    var apicall = "/quiz/getaddress";
    doApiCall(apicall).then((body)=> {
      if(body.result===true) {
        const { store } = this.props
        store.quiz.setContractInfo(body.address, body.abiaddress)

        store.pushTask('loadPubquizContract')
        store.setModal('waitForAsyncTasks')

        return true;
      } else {
        const { store } = this.props;
        console.log(JSON.stringify(store.quiz,0,2));
        alert('I am unable to talk to the oracle. The quiz can\'t be started!');

      }
    }).catch((error) => {
      alert('I am unable to talk to the oracle now. The quiz can\'t be started!');
    });

    return false;
  }

  render() {
    const { store } = this.props

    return (
      <MuiThemeProvider theme={PubquizTheme}>

        <MyAppBar/>

        <div className='content' style={{margin:'70px 0px 80px'}}>
          {store.page === 'register'     && <Register      />}
          {store.page === 'home'         && <AnswerQuestion/>}
          {store.page === 'grade'        && <Grade         />}
          {store.page === 'enterseed'    && <EnterSeed     />}
          {store.page === 'testcontract' && <TestContract  />}
        </div>

        {store.nModalsShown > 0 && <Modals />}
        {/* <Snackbar snackbar={store.snackbar} /> */}

      </MuiThemeProvider>
    );
  }
}

export default App;
