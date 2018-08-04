import axios from 'axios';

const initialState = {
  personList: [],
};

const getPersonList = async state => {
  const url = 'http://localhost:3000/api/person';
  try {
    const {
      data: { items: personList },
    } = await axios.get(url);
    return { personList };
  } catch (e) {
    const { personList } = state;
    return { personList };
  }
};

const addNewPerson = async (state, dirtyPayload) => {
  const url = 'http://localhost:3000/api/person';
  const { name, ...rest } = dirtyPayload;
  const contacts = [];

  for (let service in rest) {
    const contact = rest[service];
    contacts.push({ service, contact });
  }

  const payload = { name, contacts };

  await axios.post(url, payload);
};

const actions = store => ({
  getPersonList: state => getPersonList(state),
  addNewPerson: (state, dirtyPayload) => addNewPerson(state, dirtyPayload),
});

const props = ['personList'];

export { initialState, props, actions };
