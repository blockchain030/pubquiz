import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react'
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton'; // https://material.io/tools/icons/?style=baseline
import MenuIcon from '@material-ui/icons/Menu';

import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';

// import HomeIcon from '@material-ui/icons/Home';
import ScoresIcon from '@material-ui/icons/List';
import HelpIcon from '@material-ui/icons/Help';
import AboutIcon from '@material-ui/icons/Info';
import AdminIcon from '@material-ui/icons/VerifiedUser';
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


@inject('store') @observer class MyAppBar extends Component {
  state = {
    drawerOpen: false,
  }

  toggleDrawer = () => {
    this.setState({
      drawerOpen: !this.state.drawerOpen,
    })
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
              {store.quiz.name || "Register for Pubquiz"}
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
                <center><img src='/logo.png' alt='' width='200' /></center>
                <ListItem divider>
                  {store.team.name}
                </ListItem>

                {/* <ListItem button onClick={store.setPage.bind(this,'home')}>
                  <ListItemIcon>
                    <HomeIcon />
                  </ListItemIcon>
                  Home
                </ListItem> */}

                <ListItem button disabled={!store.team.registered} onClick={store.setModal.bind(this,'scores')}>
                  <ListItemIcon>
                    <ScoresIcon />
                  </ListItemIcon>
                  Scores
                </ListItem>

                <ListItem button onClick={store.setModal.bind(this,'help')}>
                  <ListItemIcon>
                    <HelpIcon />
                  </ListItemIcon>
                  Help
                </ListItem>

                <ListItem button divider onClick={store.setModal.bind(this,'about')}>
                  <ListItemIcon>
                    <AboutIcon />
                  </ListItemIcon>
                  About
                </ListItem>

                <ListItem button divider onClick={store.setPage.bind(this,'testcontract')}>
                  <ListItemIcon>
                    <AdminIcon />
                  </ListItemIcon>
                  Test Contract
                </ListItem>

                <ListItem button disabled={!store.team.registered} onClick={store.setModal.bind(this,'leavequiz')}>
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
