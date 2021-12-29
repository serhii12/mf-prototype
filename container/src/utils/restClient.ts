import axios from 'axios';

/**
 * Preparing rest client for react app
 * Here should be all default params defined
 */
const restClient = axios.create({
  baseURL: 'https://auth-staging.gourban.services'
});

export default restClient;
