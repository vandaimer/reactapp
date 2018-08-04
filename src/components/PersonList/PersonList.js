import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'unistore/react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandMore from '@material-ui/icons/ExpandMore';
import PersonIcon from '@material-ui/icons/Person';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import Button from '@material-ui/core/Button';
import { props, actions } from '../../reducer';

class PersonList extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    personList: PropTypes.array.isRequired,
  };

  state = { open: false };

  handleClick(contacts) {
    if (contacts.length) {
      this.setState(state => ({ open: !state.open }));
    }
  }

  async componentDidMount() {
    const { getPersonList } = this.props;
    await getPersonList();
  }

  async handleRemove(personId) {
    const { getPersonList, removePerson } = this.props;
    await removePerson(personId);
    await getPersonList();
  }

  render() {
    const { personList, classes } = this.props;

    return (
      <List component="nav">
        <h3>Contatos</h3>
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
                      <ListItem key={`${person.id}${contact.id}`} button className={classes.nested}>
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
    );
  }
}

const styles = theme => ({
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
});

export default compose(
  connect(
    props,
    actions,
  ),
  withStyles(styles),
)(PersonList);
