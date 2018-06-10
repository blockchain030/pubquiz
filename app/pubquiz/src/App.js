import React, { Component } from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import HomeIcon from '@material-ui/icons/Home';
import ScoresIcon from '@material-ui/icons/People';
import ProfileIcon from '@material-ui/icons/Person';
import { inject, observer } from 'mobx-react'
// import 'typeface-roboto'

import PubquizTheme from './PubquizTheme';
import MyAppBar from './component/MyAppBar';

import Register from './component/Register';
import AnswerQuestion from './component/AnswerQuestion';
import Scores from './component/Scores';
import EnterSeed from './component/EnterSeed';
import Help from './component/Help';
import Profile from './component/Profile';
import Settings from './component/Settings';
import About from './component/About';


// note: to get decorators working with create-react-app without using eject:
//    https://www.leighhalliday.com/mobx-create-react-app-without-ejecting

@inject('store') @observer class App extends Component {

  onChangeActiveTab = (event, activeTab) => {
    const { store } = this.props
    store.setPage(['home','scores','profile'][activeTab])
    store.setActiveTab(activeTab)
  }

  render() {
    const { store } = this.props
    // console.log(store)

    return (
      <MuiThemeProvider theme={PubquizTheme}>
      
        <MyAppBar />

        <div className='content' style={{margin:'74px 0 100px 0'}}>
          {store.page === 'home'      && (!store.team.registered ? <Register/> : <AnswerQuestion/>)}
          {store.page === 'scores'    && <Scores      />}
          {store.page === 'enterseed' && <EnterSeed   />}
          {store.page === 'help'      && <Help        />}
          {store.page === 'profile'   && <Profile     />}
          {store.page === 'settings'  && <Settings    />}
          {store.page === 'about'     && <About       />}
        </div>

        <Paper style={{position:'fixed', left:0, bottom:0,width:'100%'}}>
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
        </Paper>

      </MuiThemeProvider>
    );
  }
}

export default App;
