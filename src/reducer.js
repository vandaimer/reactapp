import axios from "axios";

const initialState = {
  personList: []
};

const getPersonList = async (state, store) => {
  console.log("store", store);
  const url = "http://localhost:3000/api/person";
  try {
    const {
      data: { items: personList }
    } = await axios.get(url);
    store.setState({ personList });
    return { personList };
  } catch (e) {
    const { personList } = state;
    return { personList };
  }
};

const addNewPerson = async (state, store, dirtyPayload) => {
  const url = "http://localhost:3000/api/person";
  const { name, ...rest } = dirtyPayload;
  const contacts = [];

  for (let service in rest) {
    const contact = rest[service];
    contacts.push({ service, contact });
  }

  const payload = { name, contacts };

  await axios.post(url, payload);
  await getPersonList(state, store);
};

const actions = store => ({
  getPersonList: state => getPersonList(state, store),
  addNewPerson: (state, dirtyPayload) =>
    addNewPerson(state, store, dirtyPayload)
});

const props = ["personList"];

export { initialState, props, actions };
