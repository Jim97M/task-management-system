export interface User {
  id: number;
  username: string;
  email: string;
  userType: string;
}

export interface Task {
  id: number;
  title: string;
  description: string;
  status: 'TODO' | 'IN_PROGRESS' | 'DONE';
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  assigneeId?: number | null;
  assignee?: User | null;
  creatorId?: number;
  createdAt?: number[];
  updatedAt?: number[];
}

export interface TasksState {
  tasks: Task[];
  filter: {
    search: string;
    status: string | null;
    assignee: number | null;
  };
}
