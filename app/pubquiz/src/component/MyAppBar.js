import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
import ProfileIcon from '@material-ui/icons/Person';
import SettingsIcon from '@material-ui/icons/Settings';
import Divider from '@material-ui/core/Divider';
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


class MyAppBar extends Component {
  state = {
    drawerOpen: false,
  }

  toggleDrawer = () => {
    this.setState({
      drawerOpen: !this.state.drawerOpen,
    })
  }

  onClickHelp = () => {
    console.log('onClickHelp')
  }
  
  onClickAbout = () => {
    console.log('onClickAbout')
  }
  
  onClickProfile = () => {
    console.log('onClickProfile')
  }
  
  onClickSettings = () => {
    console.log('onClickSettings')
  }

  onClickLogout = () => {
    console.log('onClickLogout')
  }
  
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="fixed">
          <Toolbar>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu" onClick={this.toggleDrawer}>
              <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit" className={classes.flex}>
              Blockchain030 Pubquiz
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

                <ListItem button onClick={this.onClickHelp}>
                  <ListItemIcon>
                    <HelpIcon />
                  </ListItemIcon>
                  Help
                </ListItem>

                <ListItem button onClick={this.onClickAbout}>
                  <ListItemIcon>
                    <AboutIcon />
                  </ListItemIcon>
                  About
                </ListItem>

                <ListItem button onClick={this.onClickProfile}>
                  <ListItemIcon>
                    <ProfileIcon />
                  </ListItemIcon>
                  Profile
                </ListItem>

                <ListItem button onClick={this.onClickSettings}>
                  <ListItemIcon>
                    <SettingsIcon />
                  </ListItemIcon>
                  Settings
                </ListItem>

                <Divider />

                <ListItem button onClick={this.onClickLogout}>
                  <ListItemIcon>
                    <LogoutIcon />
                  </ListItemIcon>
                  Leave Quiz
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
