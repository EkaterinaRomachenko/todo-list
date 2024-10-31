import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import styles from './login.module.css';

interface LoginProps {
  onLogin: () => void;
}

interface LoginFormData {
  username: string;
  password: string;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [loginError, setLoginError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const handleLogin = async (data: LoginFormData) => {
    setLoginError(null);

    if (data.username === 'admin' && data.password === 'admin') {
      localStorage.setItem('loggedIn', 'true');
      onLogin();
    } else {
      setLoginError('Неверный логин или пароль');
    }
  };

  return (
    <div className={styles.login}>
      <div className={styles.login}>
        <form className={styles.loginForm} onSubmit={handleSubmit(handleLogin)}>
          <input
            type="text"
            {...register('username', { required: 'Имя пользователя обязательно' })}
            placeholder="Username"
            className={styles.username}
            aria-label="Username"
          />
          {errors.username && <div className={styles.error}>{errors.username.message}</div>}

          <input
            type="password"
            {...register('password', { required: 'Пароль обязателен' })}
            placeholder="Password"
            className={styles.password}
            aria-label="Password"
          />
          {errors.password && <div className={styles.error}>{errors.password.message}</div>}
          {loginError && <div className={styles.error}>{loginError}</div>}

          <button type="submit" className={styles.loginButton}>
            Войти
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
