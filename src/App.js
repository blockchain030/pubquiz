import React, { Component } from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { inject, observer } from 'mobx-react'

import PubquizTheme from './PubquizTheme';
import MyAppBar from './component/MyAppBar';
import Snackbar from './component/Snackbar';

import Register from './component/Register';
import Waiting from './component/Waiting';
import AnswerQuestion from './component/AnswerQuestion';
import Grade from './component/Grade';
import Scores from './component/Scores';
import EnterSeed from './component/EnterSeed';
import Help from './component/Help';
import About from './component/About';
import TestContract from './component/TestContract';

// note: to get decorators working with create-react-app without using eject:
//    https://www.leighhalliday.com/mobx-create-react-app-without-ejecting

@inject('store') @observer class App extends Component {

  // onChangeActiveTab = (event, activeTab) => {
  //   const { store } = this.props
  //   store.setPage(['home','scores','profile'][activeTab])
  //   store.setActiveTab(activeTab)
  // }

  render() {
    const { store } = this.props
    // console.log(store)

    return (
      <MuiThemeProvider theme={PubquizTheme}>

        <MyAppBar />

        <div className='content' style={{margin:'70px 0px 80px'}}>
          {store.page === 'home'         && (!store.team.registered ? <Register/> : <AnswerQuestion/>)}
          {store.page === 'waiting'      && <Waiting     />}
          {store.page === 'grade'        && <Grade       />}
          {store.page === 'scores'       && <Scores      />}
          {store.page === 'enterseed'    && <EnterSeed   />}
          {store.page === 'help'         && <Help        />}
          {store.page === 'about'        && <About       />}
          {store.page === 'testcontract' && <TestContract/>}
        </div>

        {/* <Paper style={{position:'fixed', left:0, bottom:0,width:'100%'}}>
          <Tabs
            value={store.activeTab}
            onChange={this.onChangeActiveTab}
            fullWidth centered
            indicatorColor="secondary"
            textColor="secondary">
            <Tab icon={<HomeIcon    style={{fontSize: 40}}/>} label="Home"    />
            <Tab icon={<ScoresIcon  style={{fontSize: 40}}/>} label="Scores"  />
            <Tab icon={<ProfileIcon style={{fontSize: 40}}/>} label="Profile" />
          </Tabs>
        </Paper> */}

        <Snackbar snackbar={store.snackbar} />

      </MuiThemeProvider>
    );
  }
}

export default App;
