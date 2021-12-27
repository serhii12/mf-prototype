import React, { useCallback, useEffect, useState } from 'react';
import styles from './Example.module.scss';
import { useSelector } from 'react-redux';
import { getExampleReducerData } from '@core/redux/selectors/example.selectors';
import CustomersRemote from '@core/remotes/CustomersRemote';
import messagingService from '@core/utils/messagingService';
import useAction from '@core/utils/hooks/useAction';
import { Modal } from '@gourban/ui-components';

const Example = (): JSX.Element => {
  const someRandomData = useSelector(getExampleReducerData);
  const { fetchExampleAction, deleteItem } = useAction();
  const [opened, setOpened] = useState(false);

  const fetchExampleJSON = useCallback(async () => {
    try {
      await fetchExampleAction();
    } catch (e) {
      console.error(e.message);
    }
  }, [fetchExampleAction]);

  const renderData = useCallback(() => {
    return someRandomData.map((item) => (
      <p key={item?.id}>
        {item?.id} {item?.title} <button onClick={() => deleteItem(item?.id)}>Delete item</button>
      </p>
    ));
  }, [someRandomData]);

  useEffect(() => {
    messagingService.subscribeToHost((receivedData: any) => console.error(receivedData));
  }, []);

  return (
    <>
      <p className={styles['some-class']}>This is an example</p>
      <button onClick={fetchExampleJSON}>Fetch random data</button>

      {renderData()}
      <CustomersRemote />

      <button onClick={() => setOpened(true)}>Open modal</button>
      <Modal onClose={() => setOpened(false)} opened={opened}>
        <p>This is some text</p>
      </Modal>
    </>
  );
};

export default Example;
