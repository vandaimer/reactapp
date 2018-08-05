import axios from 'axios';

const apiURL = 'http://159.65.99.15:3000';
const baseURL = `${apiURL}/api/person`;

const initialState = {
  personList: [],
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

const addNewPerson = async (state, dirtyPayload) => {
  const uri = baseURL;
  const { name, ...rest } = dirtyPayload;
  const contacts = [];

  for (let service in rest) {
    const contact = rest[service];
    contacts.push({ service, contact });
  }

  const payload = { name, contacts };

  await axios.post(uri, payload);
};

const removePerson = async personId => {
  const uri = `${baseURL}/${personId}`;
  await axios.delete(uri);
};

const actions = store => ({
  getPersonList: state => getPersonList(state),
  addNewPerson: (state, dirtyPayload) => addNewPerson(state, dirtyPayload),
  removePerson: (state, personId) => removePerson(personId),
});

const props = ['personList'];

export { initialState, props, actions };
