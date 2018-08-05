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
    person: PropTypes.object.isRequired,
    populatePerson: PropTypes.func.isRequired,
    savePerson: PropTypes.func.isRequired,
  };

  async handleSubmit(event) {
    const { getPersonList, savePerson } = this.props;
    event.preventDefault();
    await savePerson();
    await getPersonList();
  }

  handleChange = name => event => {
    const { populatePerson } = this.props;
    populatePerson({ [name]: event.target.value });
  };

  render() {
    const { classes, person: { name, facebook, twitter, phone } = {} } = this.props;

    return (
      <form className={classes.container} noValidate autoComplete="off">
        <h3>É obrigatório o nome e ao menos um contato.</h3>
        <TextField
          required
          id="name"
          label="Nome"
          className={classes.textField}
          value={name}
          onChange={this.handleChange('name')}
          margin="normal"
        />
        <TextField
          id="facebook"
          label="Facebook"
          className={classes.textField}
          value={facebook}
          onChange={this.handleChange('facebook')}
          margin="normal"
        />
        <TextField
          id="twitter"
          label="Twitter"
          className={classes.textField}
          value={twitter}
          onChange={this.handleChange('twitter')}
          margin="normal"
        />
        <TextField
          id="phone"
          label="Phone"
          className={classes.textField}
          value={phone}
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
