import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'unistore/react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import PersonList from '../PersonList';
import { props, actions } from '../../reducer';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  initialState = {
    name: '',
    facebook: '',
    twitter: '',
  };

  state = { ...this.initialState };

  static propTypes = {
    classes: PropTypes.object.isRequired,
  };

  async handleSubmit(event) {
    const { getPersonList, addNewPerson } = this.props;
    event.preventDefault();
    await addNewPerson(this.state);
    await getPersonList();
    this.setState({ ...this.initialState });
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <form className={classes.container} noValidate autoComplete="off">
          <TextField
            id="name"
            label="Nome"
            className={classes.textField}
            value={this.state.name}
            onChange={this.handleChange('name')}
            margin="normal"
          />
          <TextField
            id="facebook"
            label="Facebook"
            className={classes.textField}
            value={this.state.facebook}
            onChange={this.handleChange('facebook')}
            margin="normal"
          />
          <TextField
            id="twitter"
            label="Twitter"
            className={classes.textField}
            value={this.state.twitter}
            onChange={this.handleChange('twitter')}
            margin="normal"
          />
          <Button variant="contained" className={classes.button} onClick={this.handleSubmit}>
            Salvar
          </Button>
        </form>
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
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  menu: {
    width: 200,
  },
  button: {
    margin: theme.spacing.unit,
  },
});

export default compose(
  connect(
    props,
    actions,
  ),
  withStyles(styles),
)(App);
