import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../expoapp/context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Loading...</div>; // You can show a loading spinner here
  }

  return user ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
