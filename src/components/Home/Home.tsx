import React, { FC } from 'react';
import styles from './home.module.css';
import Header from '../Header/Header';
import TaskBlock from '../TaskBlock/TaskBlock';

const Home: FC = () => {
  return (
    <div className={styles.home}>
      <Header />
      <TaskBlock />
    </div>
  );
};

export default Home;
