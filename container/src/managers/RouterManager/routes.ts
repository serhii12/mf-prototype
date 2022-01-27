import AnalyticsRemote from '@core/remotes/AnalyticsRemote';
import Login from '@core/screens/Login';

interface RoutesInterface {
  path: string;
  element: any;
  key: string;
  guarded: boolean;
  isRemote?: boolean;
  availableOnAuth?: boolean;
}

const routes: RoutesInterface[] = [
  {
    path: '/login',
    key: 'Login',
    element: Login,
    guarded: false,
    availableOnAuth: false
  },
  {
    path: '/analytics',
    key: 'AnalyticsRemote',
    element: AnalyticsRemote,
    guarded: true,
    isRemote: true
  }
];

export default routes;
