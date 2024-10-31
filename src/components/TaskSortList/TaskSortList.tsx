import React, { FC } from 'react';
import styles from './taskSortList.module.css';

interface TaskSortListProps {
  option: string;
  sortBy: string;
  setSortBy: React.Dispatch<React.SetStateAction<string>>;
  count: number;
}

const COUNT_OPTIONS = ['Все дела', 'Текущие дела'];

const TaskSortList: FC<TaskSortListProps> = ({ sortBy, setSortBy, option, count }) => {
  return (
    <li
      className={`
          ${styles.taskBlock__item} ${sortBy === option ? styles.active : ''}
        `}
      onClick={() => setSortBy(option)}
    >
      {option}
      {COUNT_OPTIONS.includes(option) && <span className={styles.count}>({count})</span>}
    </li>
  );
};

export default TaskSortList;
