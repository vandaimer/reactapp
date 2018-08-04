import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'unistore/react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandMore from '@material-ui/icons/ExpandMore';
import PersonIcon from '@material-ui/icons/Person';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import { props, actions } from '../../reducer';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  state = {
    name: '',
    facebook: '',
    twitter: '',
  };

  static propTypes = {
    getPersonList: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    personList: PropTypes.array,
  };

  static defaultProps = {
    personList: undefined,
  };

  async componentDidMount() {
    const { getPersonList } = this.props;
    await getPersonList();
  }

  handleClick(contacts) {
    if (contacts.length) {
      this.setState(state => ({ open: !state.open }));
    }
  }

  async handleRemove(personId) {
    const { getPersonList, removePerson } = this.props;
    await removePerson(personId);
    await getPersonList();
  }

  async handleSubmit(event) {
    const { getPersonList, addNewPerson } = this.props;
    event.preventDefault();
    await addNewPerson(this.state);
    await getPersonList();
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {
    const { personList, classes } = this.props;

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
        <List
          component="nav"
          subheader={<ListSubheader component="div">Person contacts</ListSubheader>}
        >
          {Boolean(personList.length) ? (
            personList.map(person => (
              <div key={person.id}>
                <ListItem button>
                  <ListItemIcon>
                    <PersonIcon />
                  </ListItemIcon>
                  <ListItemText inset primary={person.name} />
                  {Boolean(person.contacts.length) ? (
                    <ExpandMore onClick={() => this.handleClick(person.contacts)} />
                  ) : (
                    'Sem contatos'
                  )}
                  <Button onClick={() => this.handleRemove(person.id)}>Excluir</Button>
                </ListItem>
                {Boolean(person.contacts.length) && (
                  <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      {person.contacts.map(contact => (
                        <ListItem
                          key={`${person.id}${contact.id}`}
                          button
                          className={classes.nested}
                        >
                          <ListItemIcon>
                            <ContactMailIcon />
                          </ListItemIcon>
                          <ListItemText inset primary={contact.service} />
                          <ListItemText inset primary={contact.contact} />
                        </ListItem>
                      ))}
                    </List>
                  </Collapse>
                )}
              </div>
            ))
          ) : (
            <ListItem>
              <ListItemText inset primary={'Nenhum contato adicionado'} />
            </ListItem>
          )}
        </List>
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
