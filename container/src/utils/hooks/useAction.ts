import { bindActionCreators } from 'redux';
import { useDispatch } from 'react-redux';
import actions from '@core/redux/actions';

/**
 * This hook is used to bind dispatch to all actions
 * You can import any function you exported in actions without the need to use dispatch(actionFunction)
 */
const useAction = () => {
  const dispatch = useDispatch();

  return bindActionCreators(actions, dispatch);
};

export default useAction;
