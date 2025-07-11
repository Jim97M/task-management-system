// src/pages/Login.tsx
import { useState } from 'react';
import { useLoginMutation } from '../features/auth/authApi';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../components/auth/AuthForm';
import { setAuthToken } from '../utils/tokenService';
import Notification from '../components/ui/Notification';

const Login = () => {
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [notification, setNotification] = useState<{
    message: string;
    type: 'success' | 'error';
  } | null>(null);

  const handleSubmit = async (credentials: { email: string; password: string }) => {
    setError(''); // Reset error on new submission
    
    // Client-side validation
    if (!credentials.email || !credentials.password) {
      setError('Email and password are required');
      return;
    }

    try {
      const { user, token } = await login(credentials).unwrap();
      setAuthToken(token);
      dispatch(setCredentials({ user, token }));
      setNotification({ message: 'Login successful!', type: 'success' });
      setTimeout(() => navigate('/'), 1000);
    } catch (err) {
      setError('Invalid email or password');
      setNotification({ message: 'Login failed. Please try again.', type: 'error' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
      <div className="w-full max-w-2xl bg-white shadow-md rounded-xl p-12">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Sign In</h1>
        <AuthForm 
          onSubmit={handleSubmit} 
          isLogin 
          error={error} 
          isLoading={isLoading} 
        />
        <p className="text-center text-gray-600 mt-6">
          Don't have an account?{' '}
          <a href="/register" className="text-blue-600 hover:underline font-medium">
            Register
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
