import axios from 'axios';

const initialState = {
  personList: [],
};

const actions = store => ({
  async getPersonList(state) {
    const url = 'http://localhost:3000/api/person';
    const { data: { items: personList } } = await axios.get(url);
    return { personList };
  },
});


const props = [ 'personList' ];


export { initialState, props, actions };
