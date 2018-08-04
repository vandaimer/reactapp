const initialState = {
  count: 0,
};

const actions = store => ({
  increment(state) {
    return { count: state.count + 1 };
  },
});

const props = [ 'count' ];

export { initialState, props, actions };
