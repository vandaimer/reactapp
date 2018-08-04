import React, { Component } from 'react';
import { connect } from 'unistore/react';
import { props, actions } from '../../reducer';
import './App.css';

class App extends Component {

  componentDidMount () {
    const { getPersonList } = this.props;
    getPersonList();
  }

  render() {
    const { personList } = this.props;

    return(
      <div>
        {personList &&
          personList.map(person => (
            <p key={person.id} >{person.name}</p>
          ))
        }
      </div>
    );
  }
}

export default connect(props, actions)(App);
