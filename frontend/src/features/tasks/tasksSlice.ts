import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type Task } from './tasksTypes';

interface TasksState {
  tasks: Task[];
  filter: {
    search: string;
    status: string | null;
    assignee: string | null;
  };
}

interface MoveTaskPayload {
  taskId: string;
  toStatus: 'TODO' | 'IN_PROGRESS' | 'DONE';
}

interface SetFilterPayload {
  search?: string;
  status?: string | null;
  assignee?: string | null;
}

// Initial state
const initialState: TasksState = {
  tasks: [],
  filter: {
    search: '',
    status: null,
    assignee: null,
  },
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    moveTask: (state, action: PayloadAction<MoveTaskPayload>) => {
      const { taskId, toStatus } = action.payload;
      const task = state.tasks.find(t => t.id === taskId);
      if (task) {
        task.status = toStatus;
        task.updatedAt = new Date().toISOString();
      }
    },

    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
    },

    updateTask: (state, action: PayloadAction<Task>) => {
      const index = state.tasks.findIndex(t => t.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    },

    setFilter: (state, action: PayloadAction<SetFilterPayload>) => {
      state.filter = { 
        ...state.filter, 
        ...action.payload 
      };
    },

    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
    }
  }
});

export const { 
  moveTask, 
  addTask, 
  updateTask, 
  setFilter, 
  deleteTask 
} = tasksSlice.actions;

export default tasksSlice.reducer;

export type { TasksState };
