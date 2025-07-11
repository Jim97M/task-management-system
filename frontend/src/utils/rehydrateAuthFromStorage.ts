import { setCredentials, logout } from '../features/auth/authSlice';
import { isTokenExpired } from './tokenService';

export const rehydrateAuthFromStorage = (dispatch: any) => {
  const token = localStorage.getItem('token');
  const userRaw = localStorage.getItem('user');

  if (token && userRaw) {
    try {
      if (isTokenExpired(token)) {
        dispatch(logout());
        return;
      }
      const user = JSON.parse(userRaw);
      dispatch(setCredentials({ token, user }));
    } catch (error) {
      console.error('Failed to rehydrate user:', error);
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    }
  }
};
