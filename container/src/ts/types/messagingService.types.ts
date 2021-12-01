import { MessageTypes } from '@ts/enums/messagingService.enum';

export type AvailableTypes = MessageTypes.BRANCH_CHANGED;

export interface RemotesMessageInterface {
  type: AvailableTypes;
  data: any;
}
