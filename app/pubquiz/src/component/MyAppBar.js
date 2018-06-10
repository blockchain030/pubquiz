import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react'
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';

import HelpIcon from '@material-ui/icons/Help';
import AboutIcon from '@material-ui/icons/Info';
// import SettingsIcon from '@material-ui/icons/Settings';
// import Divider from '@material-ui/core/Divider';
import LogoutIcon from '@material-ui/icons/ExitToApp';


const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};


@inject('store') class MyAppBar extends Component {
  state = {
    drawerOpen: false,
  }

  toggleDrawer = () => {
    this.setState({
      drawerOpen: !this.state.drawerOpen,
    })
  }

  onClick = (page) => {
    // console.log('onClick', page)
    this.props.store.setPage(page)
  }

  onClickLeaveQuiz = () => {
    this.props.store.team.setRegistered(false)
  }

  render() {
    const { classes, store } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="fixed">
          <Toolbar>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu" onClick={this.toggleDrawer}>
              <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit" className={classes.flex}>
              Pubquiz
            </Typography>
          </Toolbar>
        </AppBar>

        <Drawer open={this.state.drawerOpen} onClose={this.toggleDrawer}>
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer}
            onKeyDown={this.toggleDrawer}>
            <div className={classes.list}>
              <List component="nav">

                <ListItem button onClick={this.onClick.bind(this,'help')}>
                  <ListItemIcon>
                    <HelpIcon />
                  </ListItemIcon>
                  Help
                </ListItem>

                {/* <ListItem button onClick={this.onClick.bind(this,'settings')}>
                  <ListItemIcon>
                    <SettingsIcon />
                  </ListItemIcon>
                  Settings
                </ListItem> */}

                {/* <Divider /> */}

                <ListItem button onClick={this.onClick.bind(this,'about')}>
                  <ListItemIcon>
                    <AboutIcon />
                  </ListItemIcon>
                  About
                </ListItem>

                <ListItem button disabled={!store.team.registered} onClick={this.onClickLeaveQuiz}>
                  <ListItemIcon>
                    <LogoutIcon />
                  </ListItemIcon>
                  Leave Quiz&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </ListItem>

              </List>
            </div>
          </div>
        </Drawer>

      </div>
    );
  }
}

MyAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MyAppBar);
