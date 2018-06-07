import React, { Component } from 'react';
import './App.css';
import { MuiThemeProvider } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import PubquizTheme from './PubquizTheme';
// import 'typeface-roboto'

import MyAppBar from './component/MyAppBar';
import Settings from './component/Settings';
import QrScanner from './component/QrScanner';

import './store/PubquizStore'


class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={PubquizTheme}>
        <MyAppBar />
        <div className="content">
          <Paper><Settings /></Paper>
          <Paper><QrScanner /></Paper>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
