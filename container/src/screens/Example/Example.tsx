import React, { useCallback } from 'react';
import styles from './Example.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { deleteItem, fetchExampleAction } from '@core/redux/actions/example.actions';
import { getExampleReducerData } from '@core/redux/selectors/example.selectors';
import CustomersRemote from '@core/remotes/CustomersRemote';

const Example = (): JSX.Element => {
  const dispatch = useDispatch();
  const someRandomData = useSelector(getExampleReducerData);

  const fetchExampleJSON = useCallback(() => {
    dispatch(fetchExampleAction());
  }, []);

  const renderData = useCallback(() => {
    return someRandomData.map((item) => (
      <p key={item?.id}>
        {item?.id} {item?.title}{' '}
        <button onClick={() => dispatch(deleteItem(item?.id))}>Delete item</button>
      </p>
    ));
  }, [someRandomData]);

  return (
    <>
      <p className={styles['some-class']}>This is an example</p>
      <button onClick={fetchExampleJSON}>Fetch random data</button>

      {renderData()}
      <CustomersRemote />
    </>
  );
};

export default Example;
