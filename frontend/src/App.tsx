// src/App.tsx
import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCredentials } from './features/auth/authSlice';
import { getAuthToken, isTokenExpired } from './utils/tokenService';
import ProtectedRoute from './components/layout/ProtectedRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/home/Dashboard';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = getAuthToken();
    const userRaw = localStorage.getItem('user');

    if (token && userRaw && !isTokenExpired(token)) {
      try {
        const user = JSON.parse(userRaw);
        dispatch(setCredentials({ user, token }));
      } catch (error) {
        console.error('Failed to parse user from localStorage:', error);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      }
    }
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
