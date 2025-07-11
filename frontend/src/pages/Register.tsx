import { useState } from 'react';
import { useRegisterMutation } from '../features/auth/authApi';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../components/auth/AuthForm';
import { setAuthToken } from '../utils/tokenService';
import Notification from '../components/ui/Notification';

const Register = () => {
  const [register, { isLoading }] = useRegisterMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [notification, setNotification] = useState<{
    message: string;
    type: 'success' | 'error';
  } | null>(null);

  const handleSubmit = async (credentials: { email: string; password: string; name?: string }) => {
    setError('');
    try {
      if (!credentials.name) {
        throw new Error('Name is required');
      }

      const { user, token } = await register({
        email: credentials.email,
        password: credentials.password,
        username: credentials.name,
        userType: 'USER'
      }).unwrap();

      setAuthToken(token);
      dispatch(setCredentials({ user, token }));
      setNotification({ message: 'Registration successful!', type: 'success' });

      setTimeout(() => {
        navigate('/');
      }, 1000);
    } catch (err) {
      setError('Registration failed. Please try again.');
      setNotification({ message: 'Registration failed. Please try again.', type: 'error' });
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
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Create Account</h1>
        <AuthForm onSubmit={handleSubmit} isLogin={false} error={error} isLoading={isLoading} />
        <p className="text-center text-gray-600 mt-6">
          Already have an account?{' '}
          <a href="/login" className="text-blue-600 hover:underline font-medium">
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
