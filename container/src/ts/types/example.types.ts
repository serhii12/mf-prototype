import { ActionTypes } from '@ts/enums/example.enum';

export interface ExampleDataInterface {
  id: number;
  title: string;
  completed: boolean;
}

export interface ExampleActionInterface {
  type: ActionTypes.THIS_IS_EXAMPLE_REDUCER;
  payload: ExampleDataInterface[];
}

export interface ExampleReducerInterface {
  data: ExampleDataInterface[];
  loading: boolean;
}

export interface ExampleDeleteInterface {
  type: ActionTypes.DELETE_ITEM;
  payload: number;
}

export type Actions = ExampleDeleteInterface | ExampleActionInterface;
