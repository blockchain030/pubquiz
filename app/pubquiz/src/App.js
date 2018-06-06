import React, { Component } from 'react';
import './App.css';
import { MuiThemeProvider } from '@material-ui/core/styles';
import PubquizTheme from './PubquizTheme';
// import 'typeface-roboto'

import MyAppBar from './component/MyAppBar';
import Settings from './component/Settings';

import './store/PubquizState'


class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={PubquizTheme}>
        <MyAppBar />
        <div className="content">
          <Settings /><Settings /><br/>
          <Settings /><Settings />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
