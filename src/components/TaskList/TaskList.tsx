import React, { FC } from 'react';
import styles from './taskList.module.css';
import { Todo } from '../../services/slice/TaskSlice';
import { IoMdCheckmark } from 'react-icons/io';
import { MdDelete } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { toggleComplete, moveToTrash } from '../../services/slice/TaskSlice';

interface TaskListProps {
  todo: Todo;
  isIconDelete: boolean;
}

const TaskList: FC<TaskListProps> = ({ todo, isIconDelete }) => {
  const dispatch = useDispatch();

  const handleComplete = () => {
    dispatch(toggleComplete(todo.id));
  };

  const handleDelete = () => {
    dispatch(moveToTrash(todo.id));
  };

  return (
    <li className={styles.taskList}>
      <p className={styles.taskList__text}>{todo.text}</p>
      {!isIconDelete && (
        <div className={styles.taskList__icons}>
          {!todo.completed && (
            <IoMdCheckmark
              size={25}
              className={styles.taskList__icon}
              onClick={handleComplete}
              aria-label="Задача выполнена"
            />
          )}
          <MdDelete
            size={25}
            className={styles.taskList__icon}
            onClick={handleDelete}
            aria-label="Удалить задачу"
          />
        </div>
      )}
    </li>
  );
};

export default TaskList;
