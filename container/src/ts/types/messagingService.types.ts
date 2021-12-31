import { MessageTypes } from '@ts/enums/messagingService.enum';

export type AvailableTypes = MessageTypes;

export interface RemotesMessageInterface {
  type: AvailableTypes;
  data: any;
}
