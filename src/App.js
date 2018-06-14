import React, { Component } from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { inject, observer } from 'mobx-react'

import PubquizTheme from './PubquizTheme';
import MyAppBar from './component/MyAppBar';
import Modals from './component/Modals';
import Snackbar from './component/Snackbar';

import Register from './component/Register';
import AnswerQuestion from './component/AnswerQuestion';
import Grade from './component/Grade';
import EnterSeed from './component/EnterSeed';
import TestContract from './component/TestContract';


// note: to get decorators working with create-react-app without using eject:
//    https://www.leighhalliday.com/mobx-create-react-app-without-ejecting


@inject('store') @observer class App extends Component {
  render() {
    const { store } = this.props

    return (
      <MuiThemeProvider theme={PubquizTheme}>

        <MyAppBar />

        <div className='content' style={{margin:'70px 0px 80px'}}>
          {store.page === 'register'     && <Register      />}
          {store.page === 'home'         && <AnswerQuestion/>}
          {store.page === 'grade'        && <Grade         />}
          {store.page === 'enterseed'    && <EnterSeed     />}
          {store.page === 'testcontract' && <TestContract  />}
        </div>

        <Modals />
        <Snackbar snackbar={store.snackbar} />

      </MuiThemeProvider>
    );
  }
}

export default App;
