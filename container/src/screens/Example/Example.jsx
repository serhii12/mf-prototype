import React from 'react';
import MapsRemote from '@core/remotes/MapsRemote';
import styles from './Example.module.scss';

const Example = () => {
  return (
    <>
      <p className={styles['some-class']}>This is an example</p>
      <MapsRemote />
    </>
  );
};

export default Example;
