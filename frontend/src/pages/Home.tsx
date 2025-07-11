import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../features/auth/authSlice';
import { useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice';
import { removeAuthToken } from '../utils/tokenService';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const user = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    removeAuthToken();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Welcome, {user?.name}!</h1>
        <p className="text-gray-600 mb-6">You are now logged in to your account.</p>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Home;
