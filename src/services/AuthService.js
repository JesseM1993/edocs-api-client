import { useState, useContext, createContext } from 'react';
import Api from './Api';

const authContext = createContext();

export function AuthProvider({ children }) {
  const auth = useAuthProvider();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const AuthService = () => {
  return useContext(authContext);
};

function useAuthProvider() {
  const [user, setUser] = useState(null);

  const login = async (credentials) => {
    try {
      const response = await Api().post('Auth/api/Login', credentials);
      setUser({
        token: response.data.Result.auth.token
      })
      console.log('Done fetching user...')
    } catch (error) {
      console.error("Error loggin in: ", error)
    }
  };

  const logout = () => {
    setUser(null)
  };

  return {
    user,
    login,
    logout
  };
}