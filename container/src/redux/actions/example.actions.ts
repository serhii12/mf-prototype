import { Dispatch } from 'redux';
import { ActionTypes } from '@ts/enums/example.enum';
import { MessageTypes } from '@ts/enums/messagingService.enum';
import { ExampleDataInterface, ExampleDeleteInterface, Actions } from '@ts/types/example.types';
import axios from 'axios';
import messagingService from '@core/utils/messagingService';

const url = 'https://jsonplaceholder.typicode.com/todos';

export const fetchExampleAction = () => async (dispatch: Dispatch<Actions>) => {
  const response = await axios.get<ExampleDataInterface[]>(url);

  dispatch({
    type: ActionTypes.THIS_IS_EXAMPLE_REDUCER,
    payload: response.data
  });

  messagingService.sendMessageToRemotes({
    type: MessageTypes.BRANCH_CHANGED,
    data: { newActiveBranch: '54213' }
  });
};

export const deleteItem = (id: number): ExampleDeleteInterface => {
  return {
    type: ActionTypes.DELETE_ITEM,
    payload: id
  };
};
