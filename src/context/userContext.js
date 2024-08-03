import axios from 'axios';
import { createContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie'; // For handling cookies

export const UserContext = createContext({});

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      const token = Cookies.get('token'); // Get token from cookies
      // console.log(token)
      if (token) {
        try {
          const response = await axios.get('/profile', { withCredentials: true });
          setUser(response.data); // Set user data from profile
        } catch (error) {
          console.error('Failed to fetch user profile', error);
          setUser(null);
        } finally {
          setIsLoading(false)
        }
      } else {
        setIsLoading(false)
        setUser(null);
      }
    };

    fetchData();
  }, []);


  return (
    <UserContext.Provider value={{ user, setUser, isLoading}}>
      {children}
    </UserContext.Provider>
  );
};