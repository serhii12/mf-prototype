import { ActionTypes } from '@ts/enums/example.enum';
import { ExampleReducerInterface, Actions, ExampleDataInterface } from '@ts/types/example.types';

const initialState: ExampleReducerInterface = {
  data: [],
  loading: false
};

export default (
  state: ExampleReducerInterface = initialState,
  action: Actions
): ExampleReducerInterface => {
  switch (action.type) {
    case ActionTypes.THIS_IS_EXAMPLE_REDUCER: {
      return {
        ...state,
        data: action.payload,
        loading: true
      };
    }

    case ActionTypes.DELETE_ITEM: {
      return {
        ...state,
        data: state?.data?.filter((item: ExampleDataInterface) => item?.id !== action?.payload),
        loading: false
      };
    }

    default:
      return state;
  }
};
