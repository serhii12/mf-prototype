import { MessageTypes } from '@ts/enums/messengingService.enum';

export type AvailableTypes = MessageTypes.BRANCH_CHANGED;

export interface RemotesMessageInterface {
  type: AvailableTypes;
  data: any;
}
