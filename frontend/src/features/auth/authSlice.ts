// src/features/auth/authSlice.ts
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type User, type AuthState } from './authTypes';
import type { RootState } from '../../app/store';

let savedUser = null;
const savedToken = localStorage.getItem('token');

try {
  const rawUser = localStorage.getItem('user');
  savedUser = rawUser ? JSON.parse(rawUser) : null;
} catch (error) {
  console.error('Failed to parse user from localStorage:', error);
  localStorage.removeItem('user'); // Clean it up if corrupted
}


const initialState: AuthState = {
  user: savedUser,
  token: savedToken || null,
  isAuthenticated: !!savedToken && !!savedUser,
};


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('user', JSON.stringify(action.payload.user));
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      state.isAuthenticated = false;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;
