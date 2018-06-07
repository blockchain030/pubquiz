import React, { Component } from 'react';
import './App.css';
import { MuiThemeProvider } from '@material-ui/core/styles';
// import Paper from '@material-ui/core/Paper';
import { observer, inject } from 'mobx-react'
// import 'typeface-roboto'

import PubquizTheme from './PubquizTheme';
import MyAppBar from './component/MyAppBar';

import Home from './component/Home';
import EnterSeed from './component/EnterSeed';
import Help from './component/Help';
import Profile from './component/Profile';
import Settings from './component/Settings';
import About from './component/About';
import LeaveQuiz from './component/LeaveQuiz';


// note: to get decorators working with create-react-app without using eject:
//    https://www.leighhalliday.com/mobx-create-react-app-without-ejecting

@inject('store') @observer class App extends Component {
  render() {
    const { store } = this.props
    // console.log(store)

    return (
      <MuiThemeProvider theme={PubquizTheme}>
        <MyAppBar />
        <div className='content'>
          {/* <Paper> */}
            {store.page === 'home'      && <Home        />}
            {store.page === 'enterseed' && <EnterSeed   />}
            {store.page === 'help'      && <Help        />}
            {store.page === 'profile'   && <Profile     />}
            {store.page === 'settings'  && <Settings    />}
            {store.page === 'about'     && <About       />}
            {store.page === 'leavequiz' && <LeaveQuiz   />}
          {/* </Paper> */}
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
