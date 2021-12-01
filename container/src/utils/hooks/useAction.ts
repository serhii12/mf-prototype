import { bindActionCreators } from 'redux';
import { useDispatch } from 'react-redux';
import actions from '@core/redux/actions';

const useAction = () => {
  const dispatch = useDispatch();

  return bindActionCreators(actions, dispatch);
};

export default useAction;
