import axios from 'axios';

const apiURL = 'http://159.65.99.15:3000';
const baseURL = `${apiURL}/api/person`;

const emptyPerson = {
  name: '',
  facebook: '',
  twitter: '',
  phone: '',
};

const initialState = {
  personList: [],
  person: { ...emptyPerson },
};

const getPersonList = async state => {
  const uri = baseURL;

  try {
    const {
      data: { items: personList },
    } = await axios.get(uri);
    return { personList };
  } catch (e) {
    const { personList } = state;
    return { personList };
  }
};

const addNewPerson = async state => {
  const uri = baseURL;
  const {
    person: { name, ...rest },
  } = state;
  const contacts = [];

  for (let service in rest) {
    const contact = rest[service];
    contacts.push({ service, contact });
  }

  const payload = { name, contacts };

  await axios.post(uri, payload);
  return { person: { ...emptyPerson } };
};

const populatePerson = (state, payload) => {
  const { person } = state;
  return { person: { ...person, ...payload } };
};

const removePerson = async personId => {
  const uri = `${baseURL}/${personId}`;
  await axios.delete(uri);
};

const actions = store => ({
  getPersonList: state => getPersonList(state),
  addNewPerson: state => addNewPerson(state),
  removePerson: (state, personId) => removePerson(personId),
  populatePerson: (state, payload) => populatePerson(state, payload),
});

const props = ['personList', 'person'];

export { initialState, props, actions };
