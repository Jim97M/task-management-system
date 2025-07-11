import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { selectIsAuthenticated } from '../../features/auth/authSlice';
import { getAuthToken, isTokenExpired } from '../../utils/tokenService';

const ProtectedRoute = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const token = getAuthToken();

  if (!isAuthenticated || !token || isTokenExpired(token)) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
