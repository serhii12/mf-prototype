import { Dispatch } from 'redux';
import { ActionTypes } from '@ts/enums/example.enum';
import {
  ExampleActionInterface,
  ExampleDataInterface,
  ExampleDeleteInterface
} from '@ts/types/example.types';
import axios from 'axios';

const url = 'https://jsonplaceholder.typicode.com/todos';

export const fetchExampleAction = () => async (dispatch: Dispatch) => {
  const response = await axios.get<ExampleDataInterface[]>(url);

  dispatch<ExampleActionInterface>({
    type: ActionTypes.THIS_IS_EXAMPLE_REDUCER,
    payload: response.data
  });
};

export const deleteItem = (id: number): ExampleDeleteInterface => {
  return {
    type: ActionTypes.DELETE_ITEM,
    payload: id
  };
};
