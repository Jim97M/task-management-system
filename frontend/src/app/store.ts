import { configureStore } from '@reduxjs/toolkit';
import { authApi } from '../features/auth/authApi';
import authReducer from '../features/auth/authSlice';
import tasksReducer from '../features/tasks/tasksSlice';
import { tasksApi } from '../features/tasks/tasksApi';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    tasks: tasksReducer,
    [authApi.reducerPath]: authApi.reducer,
    [tasksApi.reducerPath]: tasksApi.reducer, // Add tasks API reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(tasksApi.middleware), // Add tasks API middleware
});

export  type RootState = ReturnType<typeof store.getState>;
export  type AppDispatch = typeof store.dispatch;
