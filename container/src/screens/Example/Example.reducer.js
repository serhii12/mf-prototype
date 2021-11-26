export const actions = {
  THIS_IS_EXAMPLE_REDUCER: 'THIS_IS_EXAMPLE_REDUCER',
};

export const initialState = {
  data: {},
};

export default (state = initialState, { type }) => {
  switch (type) {
    case actions.THIS_IS_EXAMPLE_REDUCER: {
      return {
        ...state,
        data: { status: 'working' },
      };
    }

    default:
      return state;
  }
};
