import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'unistore/react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { props, actions } from '../../reducer';

class PersonForm extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  static propTypes = {
    classes: PropTypes.object.isRequired,
  };

  initialState = {
    name: '',
    facebook: '',
    twitter: '',
    phone: '',
  };

  state = { ...this.initialState };

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
      <form className={classes.container} noValidate autoComplete="off">
        <h3>É obrigatório o nome e ao menos um contato.</h3>
        <TextField
          required
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
        <TextField
          id="phone"
          label="Phone"
          className={classes.textField}
          value={this.state.phone}
          onChange={this.handleChange('phone')}
          margin="normal"
        />
        <Button variant="contained" className={classes.button} onClick={this.handleSubmit}>
          Salvar
        </Button>
      </form>
    );
  }
}

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
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
)(PersonForm);
