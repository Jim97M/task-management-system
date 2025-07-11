import { useState, useEffect } from 'react';
import type { Task } from '../../features/tasks/tasksTypes';
import type { User } from '../../features/tasks/tasksTypes';

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (task: {
    title: string;
    description: string;
    status: string;
    priority: string;
    assigneeId?: number | null;
  }) => void;
  users: User[];
}

const TaskModal = ({ isOpen, onClose, onSubmit, users }: TaskModalProps) => {
  const [task, setTask] = useState({
    title: '',
    description: '',
    status: 'TODO' as const,
    priority: 'MEDIUM' as const,
    assigneeId: null as number | null | undefined,
  });

  const [errors, setErrors] = useState({
    title: '',
    description: '',
  });

  useEffect(() => {
    if (!isOpen) {
      setTask({
        title: '',
        description: '',
        status: 'TODO',
        priority: 'MEDIUM',
        assigneeId: null
      });
      setErrors({ title: '', description: '' });
    }
  }, [isOpen]);

  const validate = () => {
    const newErrors = {
      title: task.title ? '' : 'Title is required',
      description: task.description ? '' : 'Description is required',
    };
    setErrors(newErrors);
    return !newErrors.title && !newErrors.description;
  };

  const handleSubmit = () => {
    if (validate()) {
      onSubmit({
        ...task,
        assigneeId: task.assigneeId === null ? undefined : task.assigneeId
      });
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
<div className="fixed inset-0 bg-white/30 backdrop-blur-sm flex items-center justify-center p-4 z-50">
  <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4">Create New Task</h2>
          
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Title*</label>
            <input
              className={`w-full p-2 border rounded ${errors.title ? 'border-red-500' : ''}`}
              value={task.title}
              onChange={(e) => setTask({...task, title: e.target.value})}
            />
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Description*</label>
            <textarea
              className={`w-full p-2 border rounded ${errors.description ? 'border-red-500' : ''}`}
              value={task.description}
              onChange={(e) => setTask({...task, description: e.target.value})}
              rows={4}
            />
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 mb-2">Status</label>
              <select
                className="w-full p-2 border rounded"
                value={task.status}
                onChange={(e) => setTask({...task, status: e.target.value as any})}
              >
                <option value="TODO">To Do</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="DONE">Done</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Priority</label>
              <select
                className="w-full p-2 border rounded"
                value={task.priority}
                onChange={(e) => setTask({...task, priority: e.target.value as any})}
              >
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
                <option value="CRITICAL">Critical</option>
              </select>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Assignee</label>
            <select
              className="w-full p-2 border rounded"
              value={task.assigneeId ?? ''}
              onChange={(e) => {
                const value = e.target.value;
                setTask({
                  ...task, 
                  assigneeId: value ? Number(value) : null
                });
              }}
            >
              <option value="">Unassigned</option>
              {users.map(user => (
                <option key={user.id} value={user.id}>
                  {user.username} ({user.email})
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
              onClick={handleSubmit}
            >
              Create Task
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
