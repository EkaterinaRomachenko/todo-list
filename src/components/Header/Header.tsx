import React, { FC, useState, useCallback } from 'react';
import styles from './header.module.css';
import { GoPlus } from 'react-icons/go';
import { MdOutlineClearAll } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { addTodo, deleteAllTodo } from '../../services/slice/TaskSlice';

const Header: FC = () => {
  const [inputValue, setInputValue] = useState('');
  const dispatch = useDispatch();

  const handleAddTodo = useCallback(() => {
    const trimmedValue = inputValue.trim();
    if (trimmedValue) {
      dispatch(addTodo(trimmedValue));
      setInputValue('');
    }
  }, [dispatch, inputValue]);

  const handleClearAll = useCallback(() => {
    dispatch(deleteAllTodo());
  }, [dispatch]);


  return (
    <div className={styles.header}>
      <div className={styles.container}>
        <button className={styles.addButton} onClick={handleAddTodo}>
          <GoPlus color="white" size={20} />
          <span>Добавить</span>
        </button>
        <input
          className={styles.input}
          type="text"
          placeholder="Пополните список..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button className={styles.clearButton} onClick={handleClearAll}>
          <span>Очистить</span>
          <MdOutlineClearAll color="white" size={20} />
        </button>
      </div>
    </div>
  );
};

export default Header;
