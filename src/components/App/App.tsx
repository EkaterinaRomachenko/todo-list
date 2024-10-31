import React, { FC, useEffect, useState } from 'react';
import styles from './app.module.css';
import '../../vendor/normalize.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../Home/Home';
import Login from '../Login/Login';

const App: FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem('loggedIn') === 'true';
    setIsLoggedIn(loggedIn);
  }, []);

  return (
    <div className={styles.app}>
      <Routes>
        <Route path="/" element={isLoggedIn ? <Home /> : <Navigate to="/login" />} />
        <Route
          path="/login"
          element={isLoggedIn ? <Navigate to="/" /> : <Login onLogin={() => setIsLoggedIn(true)} />}
        />
        <Route path="/todo-list" element={isLoggedIn ? <Home /> : <Navigate to="/login" />} />
      </Routes>
    </div>
  );
};

export default App;
