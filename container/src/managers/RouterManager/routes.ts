import AnalyticsRemote from '@core/remotes/AnalyticsRemote';
import Login from '@core/screens/Login';

interface RoutesInterface {
  path: string;
  element: any;
  private: boolean;
}

const routes: RoutesInterface[] = [
  {
    path: '/login',
    element: Login,
    private: false
  },
  {
    path: '/',
    element: AnalyticsRemote,
    private: true
  }
];

export default routes;
