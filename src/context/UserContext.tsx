import React, { useState } from 'react';
import PropTypes from 'prop-types';

const UserContext = React.createContext({
  token: '',
  updateToken: (token: string) => {}
});

export default UserContext;

export const UserConsumer = UserContext.Consumer;

export const UserProvider = ({ children }: {children: React.ReactNode}) => {
  const [token, setToken] = useState('');

  const updateToken = (_token: string) => {
    setToken(_token);
  }

  return (
    <UserContext.Provider
      value={{
        token,
        updateToken
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired
};
