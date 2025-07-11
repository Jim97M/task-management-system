// Dashboard.tsx
import { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setFilter, updateTask, addTask, deleteTask } from '../../features/tasks/tasksSlice';
import TaskModal from '../../components/tasks/TaskModal';
import TaskColumn from '../../components/tasks/TaskColumn';
import TaskFilter from '../../components/tasks/TaskFilter';
import {
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
  useGetAssignableUsersQuery,
  useGetTasksQuery,
} from '../../features/tasks/tasksApi';
import { DndContext } from '@dnd-kit/core';
import type { Task } from '../../features/tasks/tasksTypes';
import Notification from '../../components/ui/Notification';
import {selectCurrentUser, logout } from '../../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

const [isDropdownOpen, setIsDropdownOpen] = useState(false);
const dropdownRef = useRef<HTMLDivElement>(null);
const navigate = useNavigate();

const user = useSelector(selectCurrentUser);
  const filter = useSelector((state) => state.tasks.filter);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const { data: tasks = [] } = useGetTasksQuery();
  const { data: users = [], isLoading: isUsersLoading } = useGetAssignableUsersQuery();
  const [deleteTaskApi] = useDeleteTaskMutation();
  const [createTask] = useCreateTaskMutation();
  const [updateTaskApi] = useUpdateTaskMutation();

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title.toLowerCase().includes(filter.search.toLowerCase()) ||
      task.description.toLowerCase().includes(filter.search.toLowerCase());
    const matchesStatus = !filter.status || task.status === filter.status;
    const assigneeId = typeof filter.assignee === 'string' ? parseInt(filter.assignee, 10) : filter.assignee;
    const matchesAssignee = !assigneeId || task.assignee?.id === assigneeId;
    return matchesSearch && matchesStatus && matchesAssignee;
  });

const handleDeleteTask = async (taskId: number) => {
  console.log('handleDeleteTask called with:', taskId);
try {
  await deleteTaskApi(taskId).unwrap();
  dispatch(deleteTask(String(taskId)));
  setNotification({ type: 'success', message: 'Task deleted successfully!' });
} catch (err: any) {
  console.error('Failed to delete task:', err);
  if (err?.status === 'PARSING_ERROR' && err?.originalStatus === 200) {
    dispatch(deleteTask(String(taskId)));
    setNotification({ type: 'success', message: 'Task deleted successfully!' });
  } else {
    setNotification({ type: 'error', message: 'Failed to delete task.' });
  }
}

};

  const handleUpdateTask = async (taskData: Task) => {
    try {
      const payload = {
        id: taskData.id,
        title: taskData.title,
        description: taskData.description,
        status: taskData.status,
        priority: taskData.priority,
        assigneeId: taskData.assignee?.id ?? null,
      };
      await updateTaskApi(payload).unwrap();
      dispatch(updateTask(taskData));
    } catch (err) {
      console.error('Failed to update task:', err);
    }
  };

  useEffect(() => {
  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsDropdownOpen(false);
    }
  };
  document.addEventListener('mousedown', handleClickOutside);
  return () => {
    document.removeEventListener('mousedown', handleClickOutside);
  };
}, []);

  const statuses = [
    { id: 'TODO', title: 'To Do' },
    { id: 'IN_PROGRESS', title: 'In Progress' },
    { id: 'DONE', title: 'Done' },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Task Dashboard</h1>
  <div className="relative" ref={dropdownRef}>
  <button
    onClick={() => setIsDropdownOpen((prev) => !prev)}
    className="flex items-center space-x-2 bg-white px-4 py-2 rounded shadow hover:bg-gray-50"
  >
    <div className="w-8 h-8 bg-blue-500 text-white flex items-center justify-center rounded-full font-semibold">
      {user?.name || 'Username'}
    </div>
    <span className="text-gray-700 font-medium">{user?.name || 'Username'}</span>
    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  </button>

  {isDropdownOpen && (
    <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-50">
      <button
        onClick={() => {
          dispatch(logout());
          navigate('/login');
        }}
        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
      >
        Logout
      </button>
    </div>
  )}
</div>

          <div className="flex space-x-4">
            <TaskFilter onFilterChange={(filters) => dispatch(setFilter(filters))} />
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              disabled={isUsersLoading}
            >
              {isUsersLoading ? 'Loading...' : '+ New Task'}
            </button>
          </div>
        </div>

     <DndContext
  onDragEnd={({ active, over }) => {
    if (!over) return;

    const taskId = active.id;
    const newStatus = over.id;

    const task = tasks.find((t) => String(t.id) === taskId);
    if (!task || task.status === newStatus) return;

    const updatedTask: Task = {
      ...task,
      status: newStatus,
    };

    handleUpdateTask(updatedTask);
  }}
>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {statuses.map((status) => (
             <TaskColumn
  key={status.id}
  status={status.id}
  title={status.title}
  tasks={filteredTasks.filter((task) => task.status === status.id)}
  onTaskUpdate={handleUpdateTask}
  onTaskDelete={handleDeleteTask}
  users={users}
/>

            ))}
          </div>
        </DndContext>
      </div>

      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={async (taskData) => {
          try {
            const created = await createTask(taskData).unwrap();
            dispatch(addTask(created));
            setIsModalOpen(false);
          } catch (err) {
            console.error('Failed to create task:', err);
          }
        }}
        users={users}
      />
      {notification && (
  <Notification
    message={notification.message}
    type={notification.type}
    onClose={() => setNotification(null)}
  />
)}

    </div>
  );
};

export default Dashboard;
