import axios from "axios";

const initialState = {
  personList: []
};

const actions = store => ({
  async getPersonList(state) {
    const url = "http://localhost:3000/api/person";
    try {
      const {
        data: { items: personList }
      } = await axios.get(url);
      return { personList };
    } catch (e) {
      const { personList } = state;
      return { personList };
    }
  }
});

const props = ["personList"];

export { initialState, props, actions };
