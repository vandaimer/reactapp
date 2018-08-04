import React, { Component } from "react";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "unistore/react";
import { withStyles } from "@material-ui/core/styles";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ExpandMore from "@material-ui/icons/ExpandMore";
import PersonIcon from "@material-ui/icons/Person";
import ContactMailIcon from "@material-ui/icons/ContactMail";
import { props, actions } from "../../reducer";
import "./App.css";

class App extends Component {
  static propTypes = {
    getPersonList: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    personList: PropTypes.array
  };

  static defaultProps = {
    personList: undefined
  };

  componentDidMount() {
    const { getPersonList } = this.props;
    getPersonList();
  }

  state = { open: false };

  handleClick = contacts => {
    if (contacts.length) {
      this.setState(state => ({ open: !state.open }));
    }
  };

  render() {
    const { personList, classes } = this.props;

    return (
      <div className={classes.root}>
        <List
          component="nav"
          subheader={
            <ListSubheader component="div">Person contacts</ListSubheader>
          }
        >
          {Boolean(personList.length) ? (
            personList.map(person => (
              <div>
                <ListItem
                  key={person.id}
                  button
                  onClick={() => this.handleClick(person.contacts)}
                >
                  <ListItemIcon>
                    <PersonIcon />
                  </ListItemIcon>
                  <ListItemText inset primary={person.name} />
                  {Boolean(person.contacts.length) ? (
                    <ExpandMore />
                  ) : (
                    "Sem contatos"
                  )}
                </ListItem>
                {Boolean(person.contacts.length) && (
                  <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      {person.contacts.map(contact => (
                        <ListItem button className={classes.nested}>
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
              <ListItemText inset primary={"Nenhum contato adicionado"} />
            </ListItem>
          )}
        </List>
      </div>
    );
  }
}

const styles = theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4
  }
});

export default compose(
  connect(
    props,
    actions
  ),
  withStyles(styles)
)(App);
