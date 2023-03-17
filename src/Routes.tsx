import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { getCookie } from './utils/cookie-handler';
import { TOKEN } from './utils/constants';
import Login from './components/Login/Login';
import Todos from './components/Todos/Todos';
import Signup from './components/Signup/Signup';

const Router = () => {
  const loginRedirect = () => {
    console.log(getCookie(TOKEN))
    return <Navigate to="/home" />;
  };

  const logoutRedirect = () => {
    console.log(getCookie(TOKEN))
    console.log('tryingto go login')
    return <Navigate to="/login" />;
  };

  return (
    <Routes>
      <Route path="/login" element={getCookie(TOKEN) ? loginRedirect() : <Login />} />
      <Route path="/home" element={getCookie(TOKEN) ? <Todos /> : logoutRedirect()} />
      <Route path="/signup" element={getCookie(TOKEN) ? loginRedirect() : <Signup />} />
      <Route path="*" element={<Navigate to='/login' />} />
    </Routes>
  );
};

export default Router;
