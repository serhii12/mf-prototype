import { RemotesMessageInterface } from '@ts/types/messengingService.types';

/**
 * This function is used as a way to create communication between container app and remote apps
 * @returns {Object}
 */

const messengingService = {
  subscribe: (fn: Function): void => {
    window.addEventListener('hostMessage', (data: any) => fn(data?.detail));
  },
  subscribeToHost: (fn: Function): void => {
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

export default messengingService;
