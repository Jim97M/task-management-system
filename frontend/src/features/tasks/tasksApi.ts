import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Task } from './tasksTypes';
import type { User } from './tasksTypes';

export const tasksApi = createApi({
  reducerPath: 'tasksApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:9003'}/api/`,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      headers.set('Content-Type', 'application/json');
      return headers;
    }
  }),
  tagTypes: ['Tasks'],
  endpoints: (builder) => ({
    getTasks: builder.query<Task[], void>({
      query: () => 'tasks',
      providesTags: ['Tasks'],
    }),
    
    createTask: builder.mutation<Task, {
      title: string;
      description: string;
      status: string;
      priority: string;
      assigneeId?: number;
    }>({
      query: (task) => ({
        url: 'tasks',
        method: 'POST',
        body: task,
      }),
      invalidatesTags: ['Tasks'],
    }),
    
    updateTask: builder.mutation<Task, {
      id: number;
      title?: string;
      description?: string;
      status?: string;
      priority?: string;
      assigneeId?: number | null;
    }>({
      query: ({ id, ...patch }) => ({
        url: `tasks/${id}`,
        method: 'PATCH',
        body: patch,
      }),
      invalidatesTags: ['Tasks'],
    }),
    
    deleteTask: builder.mutation<void, number>({
      query: (id) => ({
        url: `tasks/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Tasks'],
    }),

    getAssignableUsers: builder.query<User[], void>({
      query: () => 'users',
    }),
  }),
});

export const { 
  useGetTasksQuery, 
  useCreateTaskMutation, 
  useUpdateTaskMutation, 
  useDeleteTaskMutation,
  useGetAssignableUsersQuery
} = tasksApi;
