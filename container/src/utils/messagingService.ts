import { RemotesMessageInterface } from '@ts/types/messagingService.types';

/**
 * This function is used as a way to create communication between container app and remote apps
 * @returns {Object}
 */

const messagingService = {
  subscribe: (fn: Function): void => {
    window.addEventListener('hostMessage', (data: any) => fn(data?.detail));
  },
  subscribeToRemotes: (fn: Function): void => {
    window.addEventListener('hostReceivingMessage', (data: any) => fn(data?.detail));
  },
  sendMessageToRemotes: (data: RemotesMessageInterface): void => {
    const event = new CustomEvent('hostMessage', { detail: data });

    window.dispatchEvent(event);
  },
  sendMessageToHost: (data: any): void => {
    const event = new CustomEvent('hostReceivingMessage', { detail: data });

    window.dispatchEvent(event);
  }
};

export default messagingService;
