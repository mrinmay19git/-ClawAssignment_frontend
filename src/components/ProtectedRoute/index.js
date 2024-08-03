import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../context/userContext';

const ProtectedRoute = ({ children }) => {
  const { user, isLoading } = useContext(UserContext);

  // Redirect to login if user is not authenticated
  return !isLoading ? user ? children : <Navigate to="/login" /> : <div>Loading</div>;

};

export default ProtectedRoute