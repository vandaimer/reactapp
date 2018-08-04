import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import PersonList from '../PersonList';
import PersonForm from '../PersonForm';
import './App.css';

class App extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <PersonForm />
        <PersonList />
      </div>
    );
  }
}

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
});

export default withStyles(styles)(App);
