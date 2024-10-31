import React, { FC, useState, useMemo } from 'react';
import styles from './taskBlock.module.css';
import TaskSortList from '../TaskSortList/TaskSortList';
import { useSelector } from 'react-redux';
import { RootState } from '../../services/store';
import TaskList from '../TaskList/TaskList';
import { Todo } from '../../services/slice/TaskSlice';

const sortByOptions = ['Текущие дела', 'Все дела', 'Выполненные дела', 'Корзина'];

const TaskBlock: FC = () => {
  const [sortBy, setSortBy] = useState('Все дела');
  const todos = useSelector((state: RootState) => state.todos.todos);
  const deletedTodos = useSelector((state: RootState) => state.todos.deletedTodos);

  // Функция фильтрации задач с использованием useMemo
  const filteredTodos = useMemo(() => {
    let filteredTodos: Todo[] = [];
    let count = 0;

    switch (sortBy) {
      case 'Текущие дела':
        filteredTodos = todos.filter((todo) => !todo.completed);
        count = filteredTodos.length;
        break;
      case 'Выполненные дела':
        filteredTodos = todos.filter((todo) => todo.completed);
        count = filteredTodos.length;
        break;
      case 'Корзина':
        filteredTodos = deletedTodos;
        count = filteredTodos.length;
        break;
      case 'Все дела':
      default:
        filteredTodos = todos;
        count = todos.length;
        break;
    }

    return { todos: filteredTodos, count };
  }, [sortBy, todos, deletedTodos]);

  const { todos: displayedTodos } = filteredTodos;

  return (
    <div className={styles.taskBlock}>
      <div className={styles.container}>
        <ul className={styles.taskBlock__Sortlist}>
          {sortByOptions.map((option) => (
            <TaskSortList
              key={option}
              option={option}
              sortBy={sortBy}
              setSortBy={setSortBy}
              count={
                option === 'Все дела'
                  ? todos.length
                  : option === 'Текущие дела'
                  ? todos.filter((todo) => !todo.completed).length
                  : 0
              }
            />
          ))}
        </ul>
        <ul className={styles.taskBlock__Tasklist}>
          {displayedTodos.map((todo) => (
            <TaskList
              key={todo.id}
              todo={todo}
              isIconDelete={sortBy === 'Корзина'}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TaskBlock;
